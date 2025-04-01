using System;
using System.Security.Cryptography;

namespace AppointmentSchedulingApp.Infrastructure.Helper
{
    public static class PasswordHasher
    {
        // We'll use BCrypt.Net-Next for hashing
        private const int WorkFactor = 12; // BCrypt work factor (higher = more secure but slower)

        /// <summary>
        /// Hash a password using BCrypt
        /// </summary>
        /// <param name="password">The password to hash</param>
        /// <returns>BCrypt hashed password</returns>
        public static string HashPassword(string password)
        {
            try
            {
                return BCrypt.Net.BCrypt.HashPassword(password, WorkFactor);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error hashing password: {ex.Message}");
                throw;
            }
        }

        /// <summary>
        /// Verify if a password matches a BCrypt hash
        /// </summary>
        /// <param name="password">The password to check</param>
        /// <param name="hashedPassword">The hashed password to check against</param>
        /// <returns>True if the password matches the hash</returns>
        public static bool VerifyPassword(string password, string hashedPassword)
        {
            if (string.IsNullOrEmpty(hashedPassword))
            {
                Console.WriteLine("VerifyPassword failed: hashedPassword is null or empty");
                return false;
            }

            try
            {
                // If it's a BCrypt hash (starts with $2a$, $2b$, or $2y$)
                if (hashedPassword.StartsWith("$2"))
                {
                    Console.WriteLine("Verifying password using BCrypt");
                    return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
                }
                else
                {
                    Console.WriteLine("Verifying password using legacy method");
                    // For legacy passwords stored in the old format
                    // This handles the old custom format if present
                    return LegacyVerifyPassword(password, hashedPassword);
                }
            }
            catch (Exception ex)
            {
                // If any error occurs (invalid format, etc.), log but return false
                Console.WriteLine($"Error in VerifyPassword: {ex.Message}");
                return false;
            }
        }

        // Legacy password verification for backward compatibility
        private static bool LegacyVerifyPassword(string password, string hashedPassword)
        {
            try
            {
                // For plaintext passwords (for migration)
                if (!hashedPassword.Contains("$") && !hashedPassword.Contains("+") && hashedPassword.Length < 50)
                {
                    Console.WriteLine("Treating password as plaintext");
                    return password == hashedPassword;
                }

                // For old format (base64 encoded salt+hash)
                Console.WriteLine("Attempting to verify as base64 legacy format");
                
                try 
                {
                    byte[] hashBytes = Convert.FromBase64String(hashedPassword);
                    
                    // Original constants from old implementation
                    const int SaltSize = 16;
                    const int HashSize = 32;
                    const int Iterations = 10000;
    
                    // Ensure valid length
                    if (hashBytes.Length != SaltSize + HashSize)
                    {
                        Console.WriteLine($"Invalid hash length: {hashBytes.Length}");
                        // As a fallback, try direct comparison
                        return password == hashedPassword;
                    }
    
                    // Extract salt and hash
                    byte[] salt = new byte[SaltSize];
                    byte[] storedHash = new byte[HashSize];
                    Array.Copy(hashBytes, 0, salt, 0, SaltSize);
                    Array.Copy(hashBytes, SaltSize, storedHash, 0, HashSize);
    
                    // Compute hash using old method
                    using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256))
                    {
                        byte[] computedHash = pbkdf2.GetBytes(HashSize);
                        
                        // Compare computed hash with stored hash
                        for (int i = 0; i < HashSize; i++)
                        {
                            if (computedHash[i] != storedHash[i])
                                return false;
                        }
                        
                        return true;
                    }
                }
                catch (FormatException)
                {
                    Console.WriteLine("Not a valid base64 string, trying direct comparison");
                    // If not a valid Base64 string, try direct comparison as a last resort
                    return password == hashedPassword;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in LegacyVerifyPassword: {ex.Message}");
                // As a last resort, try direct comparison
                try
                {
                    return password == hashedPassword;
                }
                catch
                {
                    return false;
                }
            }
        }
    }
} 