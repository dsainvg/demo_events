// Event data
const eventsData = {
  1: {
    name: "Astrophotography Workshop",
    description: "Learn the art of capturing the night sky with professional astrophotographer guidance. Hands-on experience with telescopic photography and digital editing techniques.",
    time: "7:00 PM - 10:00 PM",
    date: "Day 1",
    location: "Observatory Deck"
  },
  2: {
    name: "Telescope Viewing & Star Party",
    description: "Join fellow astronomy enthusiasts for an evening of stargazing. View colorful nebulas, star clusters, distant galaxies, and planets through professional telescopes.",
    time: "8:00 PM - 11:00 PM",
    date: "Daily",
    location: "Astronomy Amphitheater"
  },
  3: {
    name: "Space Art Competition",
    description: "Showcase your creativity in our mixed media art competition. Create masterpieces that blend various mediums to represent your vision of the cosmos.",
    time: "10:00 AM - 6:00 PM",
    date: "Day 2",
    location: "Creative Studio"
  },
  4: {
    name: "Planetarium Shows",
    description: "Immersive 15-minute shows exploring constellations and celestial phenomena. Journey through the universe in our state-of-the-art mobile planetarium.",
    time: "Every 30 minutes",
    date: "Daily",
    location: "Main Hall"
  },
  5: {
    name: "Guest Speaker Series",
    description: "Hear from professional astrophysicists and researchers about cutting-edge space exploration, from supernovas to the search for extraterrestrial life.",
    time: "2:00 PM - 3:30 PM",
    date: "Day 1 & 3",
    location: "Astronomy Amphitheater"
  },
  6: {
    name: "Solar System Hunt",
    description: "Embark on a treasure hunt through a scaled-down model of our solar system. Educational and fun for all ages with exciting prizes.",
    time: "11:00 AM - 4:00 PM",
    date: "Daily",
    location: "Outdoor Area"
  },
  7: {
    name: "Rocket Building Workshop",
    description: "Build and launch your own model rockets! Learn about propulsion, aerodynamics, and space exploration through hands-on engineering.",
    time: "1:00 PM - 4:00 PM",
    date: "Day 2",
    location: "Workshop Area"
  },
  8: {
    name: "Constellation Talks",
    description: "Join rangers for guided tours of the night sky. Learn to identify constellations, stars, and galaxies visible to the naked eye.",
    time: "9:00 PM - 9:30 PM",
    date: "Daily",
    location: "Outdoor Observatory"
  },
  9: {
    name: "Space Cocktails Speakeasy",
    description: "What does a nebula taste like? Find out at our galactic cocktail mixing event with space-themed drinks and cosmic trivia!",
    time: "7:00 PM - 9:00 PM",
    date: "Day 3",
    location: "Cosmic Lounge"
  },
  10: {
    name: "Observatory Tours",
    description: "Exclusive tours of our research-grade observatory. See professional astronomical equipment and learn about ongoing space research projects.",
    time: "3:00 PM - 5:00 PM",
    date: "Day 1 & 2",
    location: "Great Basin Observatory"
  }
};

// Global variables
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let targetAngle = 0; // Target angle for telescope movement
let currentAngle = 0; // Current angle of telescope
let currentOpenModal = null;
let animationFrameId = null; // For smooth animation

// DOM elements
let telescope;
const modal = document.getElementById('eventModal');
const modalClose = document.getElementById('modalClose');
const celestialBodies = document.querySelectorAll('.celestial-body');
const starfield = document.querySelector('.starfield');
const telescopeContainer = document.querySelector('.telescope-container');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  createStarfield(150);
  createTelescope();
  
  telescope = document.querySelector('.telescope');

  initializeEventListeners();
  initializeKeyboardNavigation();
  initializeCelestialBodies();
  
  // Start animation loop for smooth telescope movement
  startTelescopeAnimation();
});

// Create a realistic starfield
function createStarfield(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    const size = Math.random() * 2.5 + 0.5;
    star.style.width = `${size}px`;
    star.style.height = star.style.width;
    
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    
    const colors = ['#ffffff', '#f0f8ff', '#87ceeb', '#ffeaa7'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    star.style.background = color;
    star.style.color = color;

    // Add diffraction spikes to some brighter stars
    if (Math.random() > 0.95) {
      star.classList.add('star--glowing');
    }
    
    starfield.appendChild(star);
  }
}

// Create the telescope SVG dynamically
function createTelescope() {
  const svgMarkup = `
    <svg class="telescope" width="180" height="120" viewBox="0 0 180 120">
        <!-- Telescope base/stand with tripod -->
        <rect x="70" y="115" width="40" height="5" fill="#1a1a1a" rx="2"/>
        <rect x="75" y="110" width="30" height="8" fill="#2a2a2a" rx="3"/>
        
        <!-- Tripod legs -->
        <line x1="80" y1="120" x2="75" y2="125" stroke="#1a1a1a" stroke-width="3"/>
        <line x1="100" y1="120" x2="105" y2="125" stroke="#1a1a1a" stroke-width="3"/>
        <line x1="90" y1="120" x2="90" y2="125" stroke="#1a1a1a" stroke-width="3"/>
        
        <!-- Main mount structure -->
        <rect x="85" y="95" width="10" height="18" fill="#404040"/>
        <circle cx="90" cy="95" r="15" fill="#505050" stroke="#2a2a2a" stroke-width="2"/>
        
        <!-- Mount adjustment knobs -->
        <circle cx="78" cy="90" r="4" fill="#606060" stroke="#404040" stroke-width="1"/>
        <circle cx="102" cy="90" r="4" fill="#606060" stroke="#404040" stroke-width="1"/>
        <circle cx="90" cy="78" r="4" fill="#606060" stroke="#404040" stroke-width="1"/>
        
        <!-- Main telescope tube with realistic texture -->
        <rect x="25" y="45" width="90" height="20" fill="#606060" rx="10"/>
        <rect x="23" y="47" width="94" height="16" fill="#707070" rx="8"/>
        
        <!-- Telescope lens assembly with multiple elements -->
        <circle cx="25" cy="55" r="12" fill="#1a1a1a" stroke="#404040" stroke-width="3"/>
        <circle cx="25" cy="55" r="9" fill="#0066cc" opacity="0.5"/>
        <circle cx="25" cy="55" r="6" fill="#ffffff" opacity="0.7"/>
        <circle cx="25" cy="55" r="3" fill="#ffffff" opacity="0.9"/>
        
        <!-- Lens coating reflection and details -->
        <ellipse cx="22" cy="52" rx="4" ry="2" fill="#ffffff" opacity="0.4"/>
        <circle cx="20" cy="50" r="1" fill="#ffffff" opacity="0.6"/>
        
        <!-- Telescope eyepiece with adjustment -->
        <rect x="110" y="50" width="25" height="10" fill="#505050" rx="5"/>
        <rect x="112" y="52" width="21" height="6" fill="#1a1a1a" rx="3"/>
        
        <!-- Eyepiece adjustment ring -->
        <circle cx="122" cy="55" r="8" fill="#404040" stroke="#2a2a2a" stroke-width="1"/>
        <circle cx="122" cy="55" r="5" fill="#1a1a1a"/>
        <circle cx="122" cy="55" r="2" fill="#ffffff"/>
        
        <!-- Telescope tube details and rings -->
        <rect x="40" y="49" width="4" height="12" fill="#404040" rx="2"/>
        <rect x="55" y="49" width="4" height="12" fill="#404040" rx="2"/>
        <rect x="70" y="49" width="4" height="12" fill="#404040" rx="2"/>
        <rect x="85" y="49" width="4" height="12" fill="#404040" rx="2"/>
        <rect x="100" y="49" width="4" height="12" fill="#404040" rx="2"/>
        
        <!-- Focus adjustment wheel -->
        <circle cx="95" cy="40" r="10" fill="#505050" stroke="#404040" stroke-width="2"/>
        <circle cx="95" cy="40" r="6" fill="#1a1a1a"/>
        <circle cx="95" cy="40" r="3" fill="#ffffff"/>
        
        <!-- Finderscope with crosshairs -->
        <rect x="30" y="30" width="18" height="8" fill="#404040" rx="4"/>
        <circle cx="30" cy="34" r="2" fill="#1a1a1a" stroke="#2a2a2a" stroke-width="1"/>
        <circle cx="48" cy="34" r="2" fill="#1a1a1a" stroke="#2a2a2a" stroke-width="1"/>
        <line x1="30" y1="34" x2="48" y2="34" stroke="#ffffff" stroke-width="0.5" opacity="0.6"/>
        <line x1="39" y1="30" x2="39" y2="38" stroke="#ffffff" stroke-width="0.5" opacity="0.6"/>
        
        <!-- Decorative elements and labels -->
        <circle cx="45" cy="65" r="1" fill="#ffffff" opacity="0.6"/>
        <circle cx="75" cy="65" r="1" fill="#ffffff" opacity="0.6"/>
        <circle cx="105" cy="65" r="1" fill="#ffffff" opacity="0.6"/>
        
        <!-- Mount locking mechanism -->
        <rect x="88" y="85" width="4" height="8" fill="#2a2a2a" rx="2"/>
        <circle cx="90" cy="89" r="1" fill="#ffffff" opacity="0.4"/>
    </svg>
  `;
  telescopeContainer.innerHTML = svgMarkup;
}

// Initialize event listeners
function initializeEventListeners() {
  // Mouse movement tracking for telescope
  document.addEventListener('mousemove', handleMouseMove);
  
  // Celestial body interactions
  celestialBodies.forEach(body => {
    body.addEventListener('click', handleCelestialBodyClick);
    body.addEventListener('mouseenter', handleCelestialBodyHover);
    body.addEventListener('mouseleave', handleCelestialBodyLeave);
  });
  
  // Modal interactions
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', handleModalOverlayClick);
  
  // Escape key to close modal
  document.addEventListener('keydown', handleKeydown);
}

// Handle mouse movement
function handleMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Calculate target angle for telescope - doesn't directly update rotation
  calculateTelescopeTargetAngle();

  // Check for proximity to celestial bodies for improved hover detection
  checkCelestialBodyProximity();

  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

// Calculate the target angle for the telescope based on mouse position
function calculateTelescopeTargetAngle() {
  if (!telescope) return;
  
  const telescopeRect = telescope.getBoundingClientRect();
  const telescopeCenterX = telescopeRect.left + telescopeRect.width / 2;
  const telescopeCenterY = telescopeRect.top + telescopeRect.height / 2;
  
  // Calculate angle from telescope to cursor
  const deltaX = mouseX - telescopeCenterX;
  const deltaY = mouseY - telescopeCenterY;
  const rawAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  
  // Apply rotation (add 90 degrees because telescope points up by default)
  // Limit the rotation range for more realistic movement
  targetAngle = Math.max(-60, Math.min(60, rawAngle + 90));
}

// Update telescope rotation with improved smoothness using animation frame
function updateTelescopeRotation() {
  if (!telescope) return; // Guard against telescope not being ready

  // Advanced easing function for smoother movement
  // Spring physics model for more natural motion
  const springStrength = 0.05; // Lower = smoother but slower
  const damping = 0.85; // Dampening to prevent oscillation
  
  // Calculate spring force based on difference between target and current
  const angleDiff = targetAngle - currentAngle;
  const springForce = angleDiff * springStrength;
  
  // Update velocity with spring force and damping
  let velocity = springForce * 5;
  velocity *= damping;
  
  // Update current angle with velocity
  currentAngle += velocity;
  
  // Apply the updated rotation
  telescope.style.transform = `rotate(${currentAngle}deg)`;
}

// Start animation loop for smooth telescope movement
function startTelescopeAnimation() {
  // Animation loop using requestAnimationFrame for smooth movement
  function animate() {
    updateTelescopeRotation();
    animationFrameId = requestAnimationFrame(animate);
  }
  
  // Start the animation loop
  animate();
}

// Resize handler to update telescope position on window resize
window.addEventListener('resize', function() {
  // Recalculate telescope angle when window size changes
  if (telescope) {
    calculateTelescopeTargetAngle();
  }
});

// Handle celestial body click
function handleCelestialBodyClick(e) {
  const eventId = e.currentTarget.getAttribute('data-event-id');
  openModal(eventId);
}

// Handle celestial body hover
function handleCelestialBodyHover(e) {
  const body = e.currentTarget;
  
  body.style.filter = 'drop-shadow(0 0 30px currentColor) brightness(1.2)';
  
  // Apply hover scale correctly based on its unique size
  const baseScale = parseFloat(body.dataset.baseScale) || 1;
  body.style.transform = `scale(${baseScale * 1.5})`;
  
  createTooltip(body);
}

// Handle celestial body leave
function handleCelestialBodyLeave(e) {
  const body = e.currentTarget;
  
  body.style.filter = '';

  // Revert to its unique base size
  const baseScale = parseFloat(body.dataset.baseScale) || 1;
  body.style.transform = `scale(${baseScale})`;
  
  removeTooltip();
}

// Create tooltip for celestial body
function createTooltip(body) {
  const eventId = body.getAttribute('data-event-id');
  const eventData = eventsData[eventId];
  
  // Remove existing tooltip
  removeTooltip();
  
  // Create new tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.innerHTML = `<strong>${eventData.name}</strong><br>${eventData.date} - ${eventData.time}`;
  
  // Style tooltip
  Object.assign(tooltip.style, {
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.9)',
    color: '#ffffff',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    zIndex: '9999',
    pointerEvents: 'none',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    maxWidth: '200px',
    lineHeight: '1.4'
  });
  
  document.body.appendChild(tooltip);
  
  // Position tooltip near cursor
  const rect = body.getBoundingClientRect();
  tooltip.style.left = (rect.left + rect.width + 10) + 'px';
  tooltip.style.top = (rect.top - 10) + 'px';
  
  // Adjust if tooltip goes off screen
  const tooltipRect = tooltip.getBoundingClientRect();
  if (tooltipRect.right > window.innerWidth) {
    tooltip.style.left = (rect.left - tooltipRect.width - 10) + 'px';
  }
  if (tooltipRect.top < 0) {
    tooltip.style.top = (rect.bottom + 10) + 'px';
  }
}

// Remove tooltip
function removeTooltip() {
  const existingTooltip = document.querySelector('.tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }
}

// Open modal with event details
function openModal(eventId) {
  const eventData = eventsData[eventId];
  
  if (!eventData) return;
  
  // Populate modal content
  document.getElementById('modalTitle').textContent = eventData.name;
  document.getElementById('modalDescription').textContent = eventData.description;
  document.getElementById('modalDate').textContent = eventData.date;
  document.getElementById('modalTime').textContent = eventData.time;
  document.getElementById('modalLocation').textContent = eventData.location;
  
  // Show modal with animation
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  
  currentOpenModal = eventId;
  
  // Focus on close button for accessibility
  modalClose.focus();
}

// Close modal
function closeModal() {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
    currentOpenModal = null;
  }, 300);
}

// Handle modal overlay click
function handleModalOverlayClick(e) {
  if (e.target === modal) {
    closeModal();
  }
}

// Handle keyboard interactions
function handleKeydown(e) {
  switch(e.key) {
    case 'Escape':
      if (currentOpenModal) {
        closeModal();
      }
      break;
    case 'Tab':
      // Trap focus within modal when open
      if (currentOpenModal) {
        trapFocusInModal(e);
      }
      break;
  }
}

// Trap focus within modal
function trapFocusInModal(e) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
}

// Initialize keyboard navigation for celestial bodies
function initializeKeyboardNavigation() {
  celestialBodies.forEach((body, index) => {
    body.addEventListener('keydown', function(e) {
      switch(e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleCelestialBodyClick(e);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          focusNextCelestialBody(index);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          focusPreviousCelestialBody(index);
          break;
      }
    });
    
    body.addEventListener('focus', function(e) {
      handleCelestialBodyHover(e);
    });
    
    body.addEventListener('blur', function(e) {
      handleCelestialBodyLeave(e);
    });
  });
}

// Focus next celestial body
function focusNextCelestialBody(currentIndex) {
  const nextIndex = (currentIndex + 1) % celestialBodies.length;
  celestialBodies[nextIndex].focus();
}

// Focus previous celestial body
function focusPreviousCelestialBody(currentIndex) {
  const prevIndex = currentIndex === 0 ? celestialBodies.length - 1 : currentIndex - 1;
  celestialBodies[prevIndex].focus();
}

// Add particle effects on hover (optional enhancement)
function createParticleEffect(element) {
  const particles = [];
  const particleCount = 5;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    Object.assign(particle.style, {
      position: 'absolute',
      width: '2px',
      height: '2px',
      background: '#ffffff',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '999'
    });
    
    element.appendChild(particle);
    particles.push(particle);
    
    // Animate particle
    animateParticle(particle, i);
  }
  
  // Clean up particles after animation
  setTimeout(() => {
    particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
  }, 2000);
}

// Animate individual particle
function animateParticle(particle, index) {
  const angle = (360 / 5) * index;
  const distance = 30;
  const duration = 1500;
  
  const startX = 0;
  const startY = 0;
  const endX = Math.cos(angle * Math.PI / 180) * distance;
  const endY = Math.sin(angle * Math.PI / 180) * distance;
  
  particle.animate([
    {
      transform: `translate(${startX}px, ${startY}px)`,
      opacity: 1
    },
    {
      transform: `translate(${endX}px, ${endY}px)`,
      opacity: 0
    }
  ], {
    duration: duration,
    easing: 'ease-out'
  });
}

// Clean up animation on page unload
window.addEventListener('beforeunload', function() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

// Initialize celestial bodies with guaranteed spread and random movement
function initializeCelestialBodies() {
  const numBodies = celestialBodies.length;
  
  // Adjusted positioning constraints for better visibility
  const viewableHeight = 80; // Back to 80%
  const horizontalPadding = 15; // Back to 15%
  const verticalPadding = 10;   // Back to 10%

  const availableWidth = 100 - (2 * horizontalPadding);
  const availableHeight = viewableHeight - verticalPadding;

  const gridCols = Math.ceil(Math.sqrt(numBodies));
  const gridRows = Math.ceil(numBodies / gridCols);
  
  const cellWidth = availableWidth / gridCols;
  const cellHeight = availableHeight / gridRows;

  // Reduced minimum distance for less strict placement
  const minDistance = 8; 

  const cells = Array.from({ length: numBodies }, (_, i) => i);
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  const planetPositions = [];

  celestialBodies.forEach((body, index) => {
    const cellIndex = cells[index];
    const row = Math.floor(cellIndex / gridCols);
    const col = cellIndex % gridCols;

    const buffer = 5; 
    let attempts = 0;
    let left, top;
    
    do {
      left = horizontalPadding + col * cellWidth + (Math.random() * (cellWidth - buffer * 2) + buffer);
      top = verticalPadding + row * cellHeight + (Math.random() * (cellHeight - buffer * 2) + buffer);
      attempts++;
    } while (isTooCloseToOtherPlanets(left, top, planetPositions, minDistance) && attempts < 20); // Reduced attempts

    planetPositions.push({ left, top });

    body.style.left = `${left}%`;
    body.style.top = `${top}%`;
    
    const scale = Math.random() * 0.5 + 0.6;
    body.style.transform = `scale(${scale})`;
    body.dataset.baseScale = scale;

    moveBody(body, planetPositions, minDistance);
  });
}

// Check if a position is too close to existing planets
function isTooCloseToOtherPlanets(left, top, planetPositions, minDistance) {
  for (const pos of planetPositions) {
    const distance = Math.sqrt(
      Math.pow(left - pos.left, 2) + Math.pow(top - pos.top, 2)
    );
    if (distance < minDistance) {
      return true;
    }
  }
  return false;
}

// Function to move a body across the screen with improved constraints
function moveBody(body, planetPositions, minDistance) {
  const viewableHeight = 80;
  const horizontalPadding = 15;
  const verticalPadding = 10;
  const availableWidth = 100 - (2 * horizontalPadding);
  const availableHeight = viewableHeight - verticalPadding;

  let attempts = 0;
  let newLeft, newTop;
  
  do {
    newLeft = horizontalPadding + Math.random() * availableWidth;
    newTop = verticalPadding + Math.random() * availableHeight;
    attempts++;
  } while (isTooCloseToOtherPlanets(newLeft, newTop, planetPositions, minDistance) && attempts < 20); // Reduced attempts

  const bodyIndex = Array.from(celestialBodies).indexOf(body);
  if (bodyIndex !== -1 && planetPositions[bodyIndex]) {
    planetPositions[bodyIndex] = { left: newLeft, top: newTop };
  }
  
  const duration = Math.random() * 100000 + 120000;

  body.style.transition = `top ${duration}ms linear, left ${duration}ms linear, transform 0.4s ease-out`;
  body.style.top = `${newTop}%`;
  body.style.left = `${newLeft}%`;

  setTimeout(() => moveBody(body, planetPositions, minDistance), duration);
}

// Initialize telescope position and celestial bodies on load
window.addEventListener('load', function() {
  // Set initial telescope position
  if (telescope) {
    calculateTelescopeTargetAngle();
    // Instantly set to initial position
    currentAngle = targetAngle;
    telescope.style.transform = `rotate(${currentAngle}deg)`;
  }
  
  // Add smooth entrance animation for celestial bodies
  celestialBodies.forEach((body, index) => {
    body.style.opacity = '0';
    // Use the base scale for the initial transform
    const baseScale = parseFloat(body.dataset.baseScale) || 1;
    body.style.transform = `scale(0)`;
    
    setTimeout(() => {
      body.style.transition = 'all 0.8s ease-out';
      body.style.opacity = '1';
      body.style.transform = `scale(${baseScale})`;
    }, 200 + index * 100); // Small delay to ensure everything is loaded
  });
});

// Check if cursor is near any celestial body for improved hover detection
function checkCelestialBodyProximity() {
  const proximityThreshold = 40; // pixels - larger than the visual planet size
  let closestBody = null;
  let closestDistance = Infinity;

  celestialBodies.forEach(body => {
    const rect = body.getBoundingClientRect();
    const bodyCenterX = rect.left + rect.width / 2;
    const bodyCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mouseX - bodyCenterX, 2) + Math.pow(mouseY - bodyCenterY, 2)
    );
    
    if (distance < closestDistance) {
      closestDistance = distance;
      closestBody = body;
    }
  });

  // If we're close enough to a body and not already hovering it, trigger hover
  if (closestBody && closestDistance < proximityThreshold) {
    const isCurrentlyHovered = closestBody.matches(':hover');
    if (!isCurrentlyHovered) {
      // Simulate hover effect
      handleCelestialBodyHover({ currentTarget: closestBody });
    }
  } else {
    // Remove hover from all bodies if we're not near any
    celestialBodies.forEach(body => {
      if (body.matches(':hover')) {
        handleCelestialBodyLeave({ currentTarget: body });
      }
    });
  }
}