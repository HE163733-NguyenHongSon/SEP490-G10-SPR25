'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFilter, BsCalendar } from "react-icons/bs";
import { FaChevronRight, FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { Service, serviceService } from "../../services/serviceSerivce";
import RatingStars from "../../components/RatingStars";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [specialties, setSpecialties] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    price: { min: 0, max: 5000000 },
    rating: { min: 0 }
  });
  const [activeFilters, setActiveFilters] = useState(0);

  const router = useRouter();
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    // Fetch specialties from backend
    const fetchSpecialties = async () => {
      try {
        const response = await fetch('http://localhost:5220/api/Specialties');
        if (response.ok) {
          const data = await response.json();
          setSpecialties(data.map((specialty: any) => ({
            id: specialty.specialtyId,
            name: specialty.specialtyName
          })));
        }
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    // Fetch categories (mocked for now, replace with actual API endpoint when available)
    const fetchCategories = async () => {
      try {
        // Mocked categories - replace with actual API call when available
        setCategories([
          { id: 1, name: 'Surgery' },
          { id: 2, name: 'Diagnostic' },
          { id: 3, name: 'Consultation' },
          { id: 4, name: 'Treatment' }
        ]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchSpecialties();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    const applyFiltersAndSort = async () => {
      setLoading(true);
      try {
        let filteredData = [...services];
        
        // Apply search filter
        if (search) {
          filteredData = filteredData.filter(service => 
            service.serviceName.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        // Apply specialty filter
        if (selectedSpecialty) {
          try {
            const specialtyServices = await serviceService.getServicesBySpecialty(selectedSpecialty);
            filteredData = specialtyServices.filter(service => 
              !search || service.serviceName.toLowerCase().includes(search.toLowerCase())
            );
          } catch (error) {
            console.error(`Error fetching services for specialty ${selectedSpecialty}:`, error);
          }
        }
        
        // Apply category filter
        if (selectedCategory) {
          try {
            // If both specialty and category are selected, we need to filter the already filtered data
            if (selectedSpecialty) {
              filteredData = filteredData.filter(service => service.categoryId === selectedCategory);
            } else {
              // If only category is selected, we get all services for that category
              const categoryServices = await serviceService.getServicesByCategory(selectedCategory);
              filteredData = categoryServices.filter(service => 
                !search || service.serviceName.toLowerCase().includes(search.toLowerCase())
              );
            }
          } catch (error) {
            console.error(`Error filtering services for category ${selectedCategory}:`, error);
          }
        }
        
        // Apply sorting
        if (sortBy === 'rating') {
          // Sort by rating (descending)
          filteredData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === 'price_asc') {
          // Sort by price (ascending)
          filteredData.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
          // Sort by price (descending)
          filteredData.sort((a, b) => b.price - a.price);
        }
        
        setFilteredServices(filteredData);
      } catch (error) {
        console.error('Error applying filters and sorting:', error);
      } finally {
        setLoading(false);
      }
    };

    applyFiltersAndSort();
  }, [services, search, selectedSpecialty, selectedCategory, sortBy]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleServiceClick = (serviceId: number) => {
    router.push(`/patient/services/service-detail/${serviceId}`);
  };

  const handleSpecialtyChange = (specialtyName: string) => {
    const specialty = specialties.find(s => s.name === specialtyName);
    setSelectedSpecialty(specialty?.id || null);
    setCurrentPage(1); // Reset to first page when changing specialty
  };

  const handleCategoryChange = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    setSelectedCategory(category?.id || null);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset to first page when changing sort
  };

  // Date change handler
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // In a real application, you would use this date to filter services
    // For now, we'll just reset the page
    setCurrentPage(1);
  };

  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return "Select date and time";
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  };

  // Filter options handlers
  const handleFilterChange = (type: 'price' | 'rating', field: 'min' | 'max', value: number) => {
    setFilterOptions(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const applyFilters = () => {
    // Count active filters
    let count = 0;
    if (filterOptions.price.min > 0 || filterOptions.price.max < 5000000) count++;
    if (filterOptions.rating.min > 0) count++;
    setActiveFilters(count);
    
    // In a real application, you would apply these filters to your services
    // For demonstration, we'll just hide the filter panel
    setShowFilterOptions(false);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSelectedSpecialty(null);
    setSelectedCategory(null);
    setSelectedDate(null);
    setSortBy("rating");
    setSearch("");
    setFilterOptions({
      price: { min: 0, max: 5000000 },
      rating: { min: 0 }
    });
    setActiveFilters(0);
  };

  return (
    <div className="relative w-full pt-10">
      {/* Search Bar */}
      <div className="flex justify-center mb-3">
        <div className="relative flex items-center w-[400px] bg-white rounded-full shadow-md border border-gray-300 overflow-hidden">
          <button className="flex items-center bg-blue-500 text-white px-3 py-2">
            Name <FaChevronRight className="ml-2" />
          </button>
          <input
            type="text"
            placeholder="Enter the service's name to search"
            className="w-full px-3 py-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="absolute right-3 text-gray-500">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-1 mt-0 bg-white p-6 shadow-lg rounded-lg w-[105%] mx-auto flex flex-col">
        <h2 className="text-center text-xl font-semibold mb-1">Service ({filteredServices.length} result)</h2>
        <div className="flex">
          {/* Sidebar (Filter & Sort Panel) */}
          <div className="w-1/4 bg-white p-4 rounded-xl shadow-md text-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold">Filter & Sort</h2>
              <button className="text-blue-500 text-xs" onClick={handleClear}>Clear</button>
            </div>
            <div className="space-y-3">
              {/* Filter options button - updated to be interactive */}
              <div className="relative">
                <button 
                  className="flex items-center gap-2 px-3 py-2 border rounded-xl w-full"
                  onClick={() => setShowFilterOptions(!showFilterOptions)}
                >
                  <FaFilter /> Filter ({activeFilters} options)
                </button>
                
                {/* Filter dropdown panel */}
                {showFilterOptions && (
                  <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-xl p-4 z-10 mt-1 border">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Filter Options</h3>
                      <button 
                        className="text-gray-500"
                        onClick={() => setShowFilterOptions(false)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    
                    {/* Price range filter */}
                    <div className="mb-3">
                      <h4 className="text-sm mb-1">Price Range (VNĐ)</h4>
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          placeholder="Min"
                          className="border rounded px-2 py-1 w-1/2 text-sm"
                          value={filterOptions.price.min}
                          onChange={(e) => handleFilterChange('price', 'min', parseInt(e.target.value) || 0)}
                        />
                        <input 
                          type="number" 
                          placeholder="Max"
                          className="border rounded px-2 py-1 w-1/2 text-sm"
                          value={filterOptions.price.max}
                          onChange={(e) => handleFilterChange('price', 'max', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    
                    {/* Minimum rating filter */}
                    <div className="mb-3">
                      <h4 className="text-sm mb-1">Minimum Rating</h4>
                      <div className="flex items-center gap-2">
                        <input 
                          type="range" 
                          min="0" 
                          max="5" 
                          step="0.5"
                          className="w-3/4"
                          value={filterOptions.rating.min}
                          onChange={(e) => handleFilterChange('rating', 'min', parseFloat(e.target.value))}
                        />
                        <span className="text-sm">{filterOptions.rating.min}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full bg-blue-500 text-white rounded-lg py-1 mt-2"
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Sort by - unchanged */}
              <div>
                <h3 className="font-medium mb-1">Sort by</h3>
                <button 
                  className={`w-full px-3 py-2 ${sortBy === 'rating' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-xl mb-1`}
                  onClick={() => handleSortChange('rating')}
                >
                  Rating
                </button>
                <button 
                  className={`w-full px-3 py-2 ${sortBy === 'price_asc' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-xl mb-1`}
                  onClick={() => handleSortChange('price_asc')}
                >
                  Price (Low to High)
                </button>
                <button 
                  className={`w-full px-3 py-2 ${sortBy === 'price_desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-xl`}
                  onClick={() => handleSortChange('price_desc')}
                >
                  Price (High to Low)
                </button>
              </div>

              {/* Specialty - unchanged */}
              <div>
                <h3 className="font-medium mb-1">Specialty</h3>
                <div className="space-y-1">
                  {specialties.map(specialty => (
                    <button 
                      key={specialty.id}
                      className={`w-full px-3 py-2 ${selectedSpecialty === specialty.id ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-xl`}
                      onClick={() => setSelectedSpecialty(specialty.id)}
                    >
                      {specialty.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category - unchanged */}
              <div>
                <h3 className="font-medium mb-1">Category</h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <button 
                      key={category.id}
                      className={`w-full px-3 py-2 ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-xl`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date and time - updated to use DatePicker */}
              <div>
                <h3 className="font-medium mb-1">Date and time</h3>
                <div className="relative">
                  <button 
                    className={`w-full px-3 py-2 ${selectedDate ? 'bg-blue-500 text-white' : 'bg-blue-100'} rounded-xl flex justify-between items-center`}
                    onClick={() => document.getElementById('service-date-picker')?.click()}
                  >
                    <span>{selectedDate ? formatDate(selectedDate) : "Select date and time"}</span>
                    <BsCalendar />
                  </button>
                  <div className="absolute opacity-0 pointer-events-none">
                    <DatePicker
                      id="service-date-picker"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      showTimeSelect
                      dateFormat="dd/MM/yyyy - HH:mm"
                      minDate={new Date()}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-3/4 pl-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-600">No services found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedServices.map((service) => (
                  <div
                    key={service.serviceId}
                    className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
                    onClick={() => handleServiceClick(service.serviceId)}
                  >
                    <div className="relative h-32 w-full mb-2">
                      <Image
                        src={service.image?.startsWith('/') ? service.image : 
                             service.image?.startsWith('http') ? service.image : 
                             service.image ? `/${service.image}` : "/images/service.png"}
                        alt={service.serviceName}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{service.serviceName}</h3>
                    <p className="text-sm text-gray-600 mb-1 line-clamp-3">
                      {service.overview || "No description available"}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {service.estimatedTime ? `${service.estimatedTime} doctor take on` : ""}
                    </p>
                    <p className="text-blue-500 font-semibold">{service.price.toLocaleString()}vnđ</p>
                    <div className="flex text-yellow-400 mt-2">
                      <RatingStars rating={service.rating || 0} />
                      <span className="text-xs text-gray-500 ml-1">({service.ratingCount || 0} rating)</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredServices.length > 0 && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-full ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                {currentPage < totalPages && (
                  <button
                    onClick={handleNextPage}
                    className="px-3 py-1 bg-gray-200 rounded-full"
                  >
                    <FaChevronRight />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
