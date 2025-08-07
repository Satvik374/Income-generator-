// Advertisement Configuration and Management
// Replace placeholder values with your actual ad network credentials

const AdConfig = {
    // Google AdSense Configuration
    adsense: {
        publisherId: 'ca-pub-XXXXXXXXXX', // Replace with your AdSense publisher ID
        adSlots: {
            header: '1234567890',     // Replace with your header ad slot ID
            midContent: '2345678901', // Replace with your mid-content ad slot ID
            footer: '3456789012',     // Replace with your footer ad slot ID
            sidebar: '4567890123'     // Replace with your sidebar ad slot ID
        },
        autoAds: true // Enable auto ads for automatic optimization
    },

    // Media.net Configuration (AdSense Alternative)
    mediaNet: {
        customerId: 'XXXXXXXX', // Replace with your Media.net customer ID
        enabled: false // Set to true to enable Media.net ads
    },

    // PropellerAds Configuration (High-paying alternative)
    propellerAds: {
        zoneId: 'XXXXXXX', // Replace with your PropellerAds zone ID
        enabled: false // Set to true to enable PropellerAds
    },

    // Ad Settings
    settings: {
        enableAdBlock: true,     // Show message to users with ad blockers
        lazyLoading: true,       // Load ads only when visible
        refreshRate: 30000,      // Auto-refresh ads every 30 seconds
        maxAdsPerPage: 5,        // Maximum number of ads per page
        mobileOptimized: true    // Optimize ads for mobile devices
    }
};

// Initialize ad systems
function initializeAds() {
    console.log('Initializing advertisement systems...');
    
    // Initialize Google AdSense
    if (AdConfig.adsense.publisherId !== 'ca-pub-XXXXXXXXXX') {
        initializeAdSense();
    }
    
    // Initialize backup ad networks
    if (AdConfig.mediaNet.enabled) {
        initializeMediaNet();
    }
    
    if (AdConfig.propellerAds.enabled) {
        initializePropellerAds();
    }
    
    // Setup ad optimization
    setupAdOptimization();
    
    // Setup ad blocker detection
    if (AdConfig.settings.enableAdBlock) {
        detectAdBlocker();
    }
}

// Initialize Google AdSense
function initializeAdSense() {
    console.log('Loading Google AdSense...');
    
    // Auto ads configuration
    if (AdConfig.adsense.autoAds) {
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: AdConfig.adsense.publisherId,
            enable_page_level_ads: true
        });
    }
    
    // Track AdSense performance
    trackAdPerformance('adsense');
}

// Initialize Media.net (AdSense alternative)
function initializeMediaNet() {
    console.log('Loading Media.net ads...');
    
    // Media.net script loading
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `//contextual.media.net/dmedianet.js?cid=${AdConfig.mediaNet.customerId}`;
    document.head.appendChild(script);
    
    trackAdPerformance('medianet');
}

// Initialize PropellerAds
function initializePropellerAds() {
    console.log('Loading PropellerAds...');
    
    // PropellerAds configuration
    window.propellerAdsConfig = {
        zoneId: AdConfig.propellerAds.zoneId,
        refreshRate: AdConfig.settings.refreshRate
    };
    
    trackAdPerformance('propellerads');
}

// Setup ad optimization and A/B testing
function setupAdOptimization() {
    // A/B test different ad placements
    const testGroup = localStorage.getItem('adTestGroup') || (Math.random() < 0.5 ? 'A' : 'B');
    localStorage.setItem('adTestGroup', testGroup);
    
    console.log(`Ad test group: ${testGroup}`);
    
    // Apply different ad strategies based on test group
    if (testGroup === 'B') {
        // Test alternative ad placements
        document.body.classList.add('ad-test-group-b');
    }
    
    // Lazy load ads for better performance
    if (AdConfig.settings.lazyLoading) {
        setupLazyAdLoading();
    }
    
    // Auto-refresh ads for more revenue
    if (AdConfig.settings.refreshRate > 0) {
        setupAdRefresh();
    }
}

// Lazy load ads when they become visible
function setupLazyAdLoading() {
    const adContainers = document.querySelectorAll('.ad-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadAd(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    adContainers.forEach(container => {
        observer.observe(container);
    });
}

// Load individual ad
function loadAd(container) {
    const adScript = container.querySelector('script');
    if (adScript && !container.classList.contains('ad-loaded')) {
        container.classList.add('ad-loaded');
        console.log('Loading ad:', container.className);
        
        // Execute the ad script
        eval(adScript.textContent);
    }
}

// Setup automatic ad refresh
function setupAdRefresh() {
    setInterval(() => {
        refreshAds();
    }, AdConfig.settings.refreshRate);
}

// Refresh ads for increased revenue
function refreshAds() {
    const ads = document.querySelectorAll('.adsbygoogle');
    
    ads.forEach(ad => {
        // Only refresh visible ads
        if (isElementVisible(ad)) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
                console.log('Refreshed ad');
            } catch (error) {
                console.log('Ad refresh error:', error);
            }
        }
    });
}

// Check if element is visible
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Detect ad blockers and show message
function detectAdBlocker() {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.position = 'absolute';
    testAd.style.left = '-9999px';
    document.body.appendChild(testAd);
    
    setTimeout(() => {
        if (testAd.offsetHeight === 0) {
            showAdBlockerMessage();
        }
        document.body.removeChild(testAd);
    }, 100);
}

// Show message to users with ad blockers
function showAdBlockerMessage() {
    const message = document.createElement('div');
    message.className = 'adblock-message';
    message.innerHTML = `
        <div class="adblock-content">
            <h3>Support Our Site</h3>
            <p>We noticed you're using an ad blocker. Our free content is supported by advertisements. Please consider:</p>
            <ul>
                <li>Whitelisting our site in your ad blocker</li>
                <li>Subscribing to our premium content</li>
                <li>Making a small donation</li>
            </ul>
            <button onclick="this.parentElement.parentElement.style.display='none'">Continue</button>
        </div>
    `;
    
    message.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(message);
}

// Track ad performance for optimization
function trackAdPerformance(network) {
    const performanceData = {
        network: network,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        userAgent: navigator.userAgent.substring(0, 100)
    };
    
    // Store performance data
    let adPerformance = JSON.parse(localStorage.getItem('adPerformance') || '[]');
    adPerformance.push(performanceData);
    
    // Keep only last 100 entries
    if (adPerformance.length > 100) {
        adPerformance = adPerformance.slice(-100);
    }
    
    localStorage.setItem('adPerformance', JSON.stringify(adPerformance));
    
    // Send to analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ad_network_load', {
            event_category: 'Advertising',
            event_label: network,
            transport_type: 'beacon'
        });
    }
}

// Mobile ad optimization
function optimizeForMobile() {
    if (window.innerWidth < 768) {
        // Reduce number of ads on mobile
        const ads = document.querySelectorAll('.ad-container');
        ads.forEach((ad, index) => {
            if (index > 2) { // Only show first 3 ads on mobile
                ad.style.display = 'none';
            }
        });
        
        // Optimize ad sizes for mobile
        const adElements = document.querySelectorAll('.adsbygoogle');
        adElements.forEach(ad => {
            ad.style.maxWidth = '100%';
            ad.style.height = 'auto';
        });
    }
}

// Revenue optimization based on user behavior
function optimizeRevenue() {
    const userBehavior = {
        timeOnSite: Date.now() - performance.timing.navigationStart,
        scrollDepth: Math.round((window.scrollY / document.body.scrollHeight) * 100),
        clicks: parseInt(sessionStorage.getItem('clickCount') || '0')
    };
    
    // Show more ads to engaged users
    if (userBehavior.timeOnSite > 60000 && userBehavior.scrollDepth > 50) {
        enableHighValueAds();
    }
    
    // Optimize ad placement based on scroll behavior
    if (userBehavior.scrollDepth > 75) {
        showFloatingAd();
    }
}

// Enable high-value ads for engaged users
function enableHighValueAds() {
    console.log('Enabling high-value ads for engaged user');
    
    // Add additional ad units
    if (document.querySelectorAll('.ad-container').length < AdConfig.settings.maxAdsPerPage) {
        addDynamicAd();
    }
}

// Show floating ad for users who scroll deep
function showFloatingAd() {
    if (document.querySelector('.floating-ad')) return; // Already shown
    
    const floatingAd = document.createElement('div');
    floatingAd.className = 'floating-ad';
    floatingAd.innerHTML = `
        <div class="floating-ad-content">
            <button class="close-floating-ad" onclick="this.parentElement.parentElement.remove()">&times;</button>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${AdConfig.adsense.publisherId}"
                 data-ad-slot="${AdConfig.adsense.adSlots.sidebar}"
                 data-ad-format="rectangle"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
    `;
    
    floatingAd.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        max-width: 300px;
    `;
    
    document.body.appendChild(floatingAd);
}

// Add dynamic ad based on content
function addDynamicAd() {
    const content = document.querySelector('.methods-section');
    if (!content) return;
    
    const dynamicAd = document.createElement('div');
    dynamicAd.className = 'ad-container dynamic-ad';
    dynamicAd.innerHTML = `
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${AdConfig.adsense.publisherId}"
             data-ad-slot="${AdConfig.adsense.adSlots.sidebar}"
             data-ad-format="auto"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    `;
    
    content.appendChild(dynamicAd);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAds();
    optimizeForMobile();
    
    // Optimize revenue after user interaction
    setTimeout(optimizeRevenue, 10000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdConfig;
}