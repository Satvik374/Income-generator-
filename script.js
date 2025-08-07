// Income Generator Hub - JavaScript Functionality

// Global variables
let stripe;
let emailSubscribers = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    trackPageView();
});

// Initialize Stripe (replace with your publishable key)
function initializeStripe() {
    stripe = Stripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');
}

// Track page views and user interactions
function trackPageView() {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Custom analytics tracking
    trackVisitor();
}

// Track visitor data for income optimization
function trackVisitor() {
    const visitorData = {
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`
    };
    
    // Store visitor data for income analytics
    localStorage.setItem('visitorData', JSON.stringify(visitorData));
    
    // Track for conversion optimization
    console.log('Visitor tracked for income optimization:', visitorData);
}

// Initialize application
function initializeApp() {
    initializeStripe();
    loadEmailSubscriberCount();
    setupAffiliateTracking();
    setupAdOptimization();
    animateStats();
}

// Setup event listeners
function setupEventListeners() {
    // Email form submission
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', handleEmailSignup);
    }
    
    // Affiliate link tracking
    const affiliateLinks = document.querySelectorAll('.affiliate-link');
    affiliateLinks.forEach(link => {
        link.addEventListener('click', trackAffiliateClick);
    });
    
    // Mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Track scroll depth for ad optimization
    window.addEventListener('scroll', trackScrollDepth);
}

// Handle email signup (lead generation)
async function handleEmailSignup(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const submitButton = e.target.querySelector('button[type="submit"]');
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    try {
        // Simulate email signup (replace with your email service API)
        await subscribeToNewsletter(email);
        
        // Track conversion
        trackEmailSignup(email);
        
        // Success feedback
        showNotification('Success! Check your email for the free guide.', 'success');
        emailInput.value = '';
        
        // Trigger download or redirect to thank you page
        setTimeout(() => {
            window.open('/downloads/income-starter-kit.pdf', '_blank');
        }, 1000);
        
    } catch (error) {
        console.error('Email signup error:', error);
        showNotification('Something went wrong. Please try again.', 'error');
    } finally {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

// Subscribe to newsletter (replace with your email service)
async function subscribeToNewsletter(email) {
    // Example with Mailchimp API (replace with your actual implementation)
    const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
        throw new Error('Subscription failed');
    }
    
    // Update subscriber count
    emailSubscribers++;
    updateEmailSubscriberDisplay();
    
    return response.json();
}

// Track email signups for conversion optimization
function trackEmailSignup(email) {
    // Google Analytics conversion tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'lead_generation', {
            event_category: 'Email',
            event_label: 'Newsletter Signup',
            value: 1
        });
    }
    
    // Custom conversion tracking
    const conversionData = {
        type: 'email_signup',
        email: email,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    };
    
    // Store for analytics
    let conversions = JSON.parse(localStorage.getItem('conversions') || '[]');
    conversions.push(conversionData);
    localStorage.setItem('conversions', JSON.stringify(conversions));
    
    console.log('Email conversion tracked:', conversionData);
}

// Track affiliate link clicks (income source)
function trackAffiliateClick(e) {
    const link = e.currentTarget;
    const product = link.dataset.product;
    const url = link.href;
    
    // Track click for commission optimization
    const clickData = {
        product: product,
        url: url,
        timestamp: new Date().toISOString(),
        referrer: window.location.href
    };
    
    // Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'affiliate_click', {
            event_category: 'Affiliate',
            event_label: product,
            transport_type: 'beacon'
        });
    }
    
    // Store affiliate click data
    let affiliateClicks = JSON.parse(localStorage.getItem('affiliateClicks') || '[]');
    affiliateClicks.push(clickData);
    localStorage.setItem('affiliateClicks', JSON.stringify(affiliateClicks));
    
    console.log('Affiliate click tracked:', clickData);
    
    // Show conversion notification
    showNotification(`Redirecting to ${product}... Earn us a commission by signing up!`, 'info');
}

// Handle premium subscription (Stripe integration)
async function subscribe(plan) {
    if (!stripe) {
        showNotification('Payment system is loading. Please try again.', 'error');
        return;
    }
    
    const planPrices = {
        starter: 'price_starter_monthly',
        pro: 'price_pro_monthly', 
        elite: 'price_elite_monthly'
    };
    
    try {
        // Track subscription attempt
        if (typeof gtag !== 'undefined') {
            gtag('event', 'subscription_attempt', {
                event_category: 'Subscription',
                event_label: plan,
                value: getPlanValue(plan)
            });
        }
        
        // Create Stripe checkout session
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{
                price: planPrices[plan],
                quantity: 1,
            }],
            mode: 'subscription',
            successUrl: `${window.location.origin}/success?plan=${plan}`,
            cancelUrl: `${window.location.origin}/cancel`,
            customerEmail: getStoredEmail(),
        });
        
        if (error) {
            console.error('Stripe error:', error);
            showNotification('Payment failed. Please try again.', 'error');
        }
        
    } catch (error) {
        console.error('Subscription error:', error);
        showNotification('Something went wrong. Please try again.', 'error');
    }
}

// Get plan value for analytics
function getPlanValue(plan) {
    const values = { starter: 29, pro: 79, elite: 199 };
    return values[plan] || 0;
}

// Calculate potential affiliate income
function calculateIncome() {
    const visitors = parseInt(document.getElementById('visitors').value) || 0;
    const conversionRate = parseFloat(document.getElementById('conversion').value) || 0;
    const avgCommission = parseFloat(document.getElementById('commission').value) || 0;
    
    if (visitors <= 0 || conversionRate <= 0 || avgCommission <= 0) {
        showNotification('Please enter valid numbers for all fields.', 'error');
        return;
    }
    
    const monthlyIncome = visitors * (conversionRate / 100) * avgCommission;
    const yearlyIncome = monthlyIncome * 12;
    
    const resultDiv = document.getElementById('income-result');
    resultDiv.innerHTML = `
        <h4>Potential Income:</h4>
        <p><strong>Monthly:</strong> $${monthlyIncome.toFixed(2)}</p>
        <p><strong>Yearly:</strong> $${yearlyIncome.toFixed(2)}</p>
    `;
    
    // Track calculator usage
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calculator_use', {
            event_category: 'Tools',
            event_label: 'Income Calculator',
            value: Math.round(monthlyIncome)
        });
    }
}

// Setup affiliate tracking
function setupAffiliateTracking() {
    // Track affiliate performance
    const affiliateData = {
        session: generateSessionId(),
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    };
    
    sessionStorage.setItem('affiliateSession', JSON.stringify(affiliateData));
}

// Setup ad optimization
function setupAdOptimization() {
    // Optimize ad placement based on user behavior
    optimizeAdPlacement();
    
    // A/B test ad formats
    runAdABTest();
}

// Optimize ad placement for maximum revenue
function optimizeAdPlacement() {
    const adContainer = document.querySelector('.ad-container');
    if (!adContainer) return;
    
    // Track ad viewability
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackAdView();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(adContainer);
}

// Track ad views for optimization
function trackAdView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ad_view', {
            event_category: 'Advertising',
            event_label: 'Banner Ad',
            transport_type: 'beacon'
        });
    }
    
    console.log('Ad view tracked for revenue optimization');
}

// A/B test different ad formats
function runAdABTest() {
    const testGroup = Math.random() < 0.5 ? 'A' : 'B';
    
    // Store test group for analytics
    sessionStorage.setItem('adTestGroup', testGroup);
    
    // Apply different ad configurations based on test group
    if (testGroup === 'B') {
        // Test alternative ad format
        document.body.classList.add('ad-test-b');
    }
}

// Track scroll depth for engagement metrics
let maxScrollDepth = 0;
function trackScrollDepth() {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track significant scroll milestones
        if (scrollDepth >= 25 && scrollDepth < 50) {
            trackScrollMilestone(25);
        } else if (scrollDepth >= 50 && scrollDepth < 75) {
            trackScrollMilestone(50);
        } else if (scrollDepth >= 75 && scrollDepth < 90) {
            trackScrollMilestone(75);
        } else if (scrollDepth >= 90) {
            trackScrollMilestone(90);
        }
    }
}

// Track scroll milestones
function trackScrollMilestone(depth) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll_depth', {
            event_category: 'Engagement',
            event_label: `${depth}%`,
            value: depth
        });
    }
}

// Animate statistics on page load
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-card h3');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
        
        if (isNaN(numericValue)) return;
        
        let currentValue = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= numericValue) {
                stat.textContent = finalValue;
                clearInterval(timer);
            } else {
                const formatted = Math.floor(currentValue).toLocaleString();
                stat.textContent = finalValue.replace(/[0-9,]+/, formatted);
            }
        }, 30);
    });
}

// Load email subscriber count
function loadEmailSubscriberCount() {
    // Simulate loading subscriber count from database
    emailSubscribers = parseInt(localStorage.getItem('emailSubscribers') || '10000');
    updateEmailSubscriberDisplay();
}

// Update email subscriber count display
function updateEmailSubscriberDisplay() {
    const subscriberStat = document.querySelector('.stat-card h3');
    if (subscriberStat && subscriberStat.textContent.includes('10,000')) {
        subscriberStat.textContent = `${emailSubscribers.toLocaleString()}+`;
    }
}

// Smooth scrolling for navigation
function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Utility functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generateSessionId() {
    return Math.random().toString(36).substr(2, 9);
}

function getStoredEmail() {
    // Get email from previous signup or return empty
    const conversions = JSON.parse(localStorage.getItem('conversions') || '[]');
    const lastEmailSignup = conversions.find(c => c.type === 'email_signup');
    return lastEmailSignup ? lastEmailSignup.email : '';
}

// Show notifications to users
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification button {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Revenue tracking and optimization
function optimizeRevenue() {
    // Analyze user behavior for revenue optimization
    const behaviorData = {
        scrollDepth: maxScrollDepth,
        timeOnSite: Date.now() - performance.timing.navigationStart,
        clicksCount: getClickCount(),
        conversions: getConversions()
    };
    
    // Optimize based on behavior
    if (behaviorData.scrollDepth > 75 && behaviorData.timeOnSite > 60000) {
        // High engagement - show premium offer
        showPremiumOffer();
    } else if (behaviorData.clicksCount > 3) {
        // Active user - show affiliate recommendations
        showAffiliateRecommendations();
    }
}

// Show premium offer modal for engaged users
function showPremiumOffer() {
    // Implementation for premium offer modal
    console.log('Showing premium offer to engaged user');
}

// Show affiliate recommendations
function showAffiliateRecommendations() {
    // Implementation for affiliate recommendation popup
    console.log('Showing affiliate recommendations to active user');
}

// Get click count from session
function getClickCount() {
    return parseInt(sessionStorage.getItem('clickCount') || '0');
}

// Get conversions from localStorage
function getConversions() {
    return JSON.parse(localStorage.getItem('conversions') || '[]');
}

// Track all clicks for behavior analysis
document.addEventListener('click', function() {
    const clickCount = getClickCount() + 1;
    sessionStorage.setItem('clickCount', clickCount.toString());
});

// Initialize revenue optimization on page load
window.addEventListener('load', function() {
    setTimeout(optimizeRevenue, 10000); // Optimize after 10 seconds
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        calculateIncome,
        trackAffiliateClick,
        handleEmailSignup
    };
}