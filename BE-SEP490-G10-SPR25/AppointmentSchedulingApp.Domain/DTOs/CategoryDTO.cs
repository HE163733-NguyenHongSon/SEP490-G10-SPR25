using System.ComponentModel.DataAnnotations;

namespace AppointmentSchedulingApp.Domain.DTOs

{
    public class CategoryDTO
    {
        [Key]
        public int CategoryId { get; set; }

        public string CategoryName { get; set; } = null!;
    }
}
