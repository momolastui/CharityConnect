let allEvents = [];
let allCategories = [];

// Page load initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, starting initialization...');
    
    // Execute corresponding initialization based on current page
    if (document.getElementById('event-list')) {
        initHomePage();
    } else if (document.getElementById('searchForm')) {
        initSearchPage();
    } else if (document.getElementById('event-detail')) {
        initDetailsPage();
    }
});

// Home page initialization
function initHomePage() {
    console.log('Initializing home page...');
    loadEvents();
}

// Search page initialization
function initSearchPage() {
    console.log('Initializing search page...');
    
    // Load category data
    loadCategories();
    
    // Bind search form
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        searchEvents();
    });
    
    // Initially show all events
    searchEvents();
}

// Details page initialization
function initDetailsPage() {
    console.log('Initializing details page...');
    loadEventDetails();
}

// Load all event data
async function loadEvents() {
    try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('API request failed');
        
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Failed to load events:', error);
        // Use mock data as fallback
        displayEvents(getMockEvents());
    }
}

// Load category data
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('API request failed');
        
        const categories = await response.json();
        populateCategorySelect(categories);
    } catch (error) {
        console.error('Failed to load categories:', error);
        // Use mock data as fallback
        populateCategorySelect(getMockCategories());
    }
}

// Search events
async function searchEvents() {
    const category = document.getElementById('category').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    
    try {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (location) params.append('location', location);
        if (date) params.append('date', date);
        
        const response = await fetch(`/api/events/search?${params}`);
        if (!response.ok) throw new Error('Search request failed');
        
        const events = await response.json();
        displaySearchResults(events);
    } catch (error) {
        console.error('Search failed:', error);
        // Use mock data as fallback
        displaySearchResults(getMockEvents());
    }
}

// Load event details
async function loadEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    
    if (!eventId) {
        showError('No event ID specified');
        return;
    }
    
    try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) throw new Error('Details request failed');
        
        const event = await response.json();
        displayEventDetails(event);
    } catch (error) {
        console.error('Failed to load details:', error);
        // Use mock data as fallback
        const mockEvent = getMockEvents().find(e => e.id == eventId);
        if (mockEvent) {
            displayEventDetails(mockEvent);
        } else {
            showError('Event does not exist');
        }
    }
}

// Display events list
function displayEvents(events) {
    const container = document.getElementById('event-list');
    if (!container) return;
    
    container.innerHTML = events.map(event => `
        <div class="event-card">
            <h3>${escapeHtml(event.name)}</h3>
            <p>Date: ${formatDate(event.date)}</p>
            <p>Location: ${escapeHtml(event.location)}</p>
            <p>Category: ${escapeHtml(event.category_name)}</p>
            <a href="event-details.html?id=${event.id}" class="btn">View Details</a>
        </div>
    `).join('');
}

// Display search results
function displaySearchResults(events) {
    const container = document.getElementById('search-results-list');
    if (!container) return;
    
    if (events.length === 0) {
        container.innerHTML = '<p>No matching events found</p>';
        return;
    }
    
    container.innerHTML = events.map(event => `
        <div class="event-card">
            <h3>${escapeHtml(event.name)}</h3>
            <p>Date: ${formatDate(event.date)}</p>
            <p>Location: ${escapeHtml(event.location)}</p>
            <p>Category: ${escapeHtml(event.category_name)}</p>
            <a href="event-details.html?id=${event.id}" class="btn">View Details</a>
        </div>
    `).join('');
}

// Display event details
function displayEventDetails(event) {
    const container = document.getElementById('event-detail');
    if (!container) return;
    
    container.innerHTML = `
        <div class="event-detail">
            <h1>${escapeHtml(event.name)}</h1>
            <div class="event-info">
                <p><strong>Date:</strong> ${formatDate(event.date)}</p>
                <p><strong>Location:</strong> ${escapeHtml(event.location)}</p>
                <p><strong>Category:</strong> ${escapeHtml(event.category_name)}</p>
                <p><strong>Description:</strong> ${escapeHtml(event.description)}</p>
                <p><strong>Price:</strong> $${parseFloat(event.ticket_price || 0).toFixed(2)}</p>
            </div>
            <a href="search.html" class="btn">Back to Search</a>
        </div>
    `;
}

// Populate category select box
function populateCategorySelect(categories) {
    const select = document.getElementById('category');
    if (!select) return;
    
    select.innerHTML = '<option value="">All Categories</option>' + 
        categories.map(cat => `<option value="${cat.id}">${escapeHtml(cat.name)}</option>`).join('');
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    console.error('Error:', message);
    alert(message);
}

// Mock data functions


function getMockCategories() {
    return [
        { id: 1, name: "Environmental Protection" },
        { id: 2, name: "Education" },
        { id: 3, name: "Healthcare" },
        { id: 4, name: "Animal Welfare" },
        { id: 5, name: "Community Development" }
    ];
}