// Cookie Consent Manager
// Add this to a new file: assets/cookies.js

class CookieConsent {
    constructor() {
        this.cookieName = 'ildikofonad_cookie_consent';
        this.cookieExpiry = 365; // days
        this.init();
    }

    init() {
        // Check if consent already given
        const consent = this.getConsent();
        
        if (!consent) {
            this.showBanner();
        } else {
            this.loadCookies(consent);
        }
    }

    showBanner() {
        // Create banner HTML
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner__content">
                <div class="cookie-banner__text">
                    <h3>🍪 Cookie-Einstellungen</h3>
                    <p>Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten. Einige sind notwendig, während andere uns helfen, die Website zu verbessern.</p>
                </div>
                <div class="cookie-banner__buttons">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn--primary">
                        Alle akzeptieren
                    </button>
                    <button id="cookie-settings" class="cookie-btn cookie-btn--secondary">
                        Einstellungen
                    </button>
                    <button id="cookie-reject" class="cookie-btn cookie-btn--text">
                        Nur notwendige
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('cookie-accept-all').addEventListener('click', () => {
            this.saveConsent({ necessary: true, analytics: true, marketing: true });
            this.hideBanner();
        });

        document.getElementById('cookie-reject').addEventListener('click', () => {
            this.saveConsent({ necessary: true, analytics: false, marketing: false });
            this.hideBanner();
        });

        document.getElementById('cookie-settings').addEventListener('click', () => {
            this.showSettings();
        });

        // Animate banner in
        setTimeout(() => {
            banner.classList.add('cookie-banner--visible');
        }, 500);
    }

    showSettings() {
        const modal = document.createElement('div');
        modal.id = 'cookie-modal';
        modal.innerHTML = `
            <div class="cookie-modal__overlay"></div>
            <div class="cookie-modal__content">
                <div class="cookie-modal__header">
                    <h2>Cookie-Einstellungen</h2>
                    <button class="cookie-modal__close" id="close-modal">&times;</button>
                </div>
                <div class="cookie-modal__body">
                    <div class="cookie-category">
                        <div class="cookie-category__header">
                            <label class="cookie-toggle">
                                <input type="checkbox" checked disabled>
                                <span class="cookie-toggle__slider"></span>
                            </label>
                            <div>
                                <h3>Notwendige Cookies</h3>
                                <p>Diese Cookies sind für die Funktion der Website erforderlich und können nicht deaktiviert werden.</p>
                            </div>
                        </div>
                    </div>

                    <div class="cookie-category">
                        <div class="cookie-category__header">
                            <label class="cookie-toggle">
                                <input type="checkbox" id="analytics-toggle">
                                <span class="cookie-toggle__slider"></span>
                            </label>
                            <div>
                                <h3>Analytische Cookies</h3>
                                <p>Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.</p>
                            </div>
                        </div>
                    </div>

                    <div class="cookie-category">
                        <div class="cookie-category__header">
                            <label class="cookie-toggle">
                                <input type="checkbox" id="marketing-toggle">
                                <span class="cookie-toggle__slider"></span>
                            </label>
                            <div>
                                <h3>Marketing Cookies</h3>
                                <p>Diese Cookies werden verwendet, um Ihnen relevante Werbung anzuzeigen.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cookie-modal__footer">
                    <button id="save-preferences" class="cookie-btn cookie-btn--primary">
                        Auswahl speichern
                    </button>
                    <button id="accept-all-modal" class="cookie-btn cookie-btn--secondary">
                        Alle akzeptieren
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate modal in
        setTimeout(() => {
            modal.classList.add('cookie-modal--visible');
        }, 50);

        // Event listeners
        document.getElementById('close-modal').addEventListener('click', () => {
            this.hideModal();
        });

        document.querySelector('.cookie-modal__overlay').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('save-preferences').addEventListener('click', () => {
            const analytics = document.getElementById('analytics-toggle').checked;
            const marketing = document.getElementById('marketing-toggle').checked;
            this.saveConsent({ necessary: true, analytics, marketing });
            this.hideModal();
            this.hideBanner();
        });

        document.getElementById('accept-all-modal').addEventListener('click', () => {
            this.saveConsent({ necessary: true, analytics: true, marketing: true });
            this.hideModal();
            this.hideBanner();
        });
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('cookie-banner--visible');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    hideModal() {
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.classList.remove('cookie-modal--visible');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    saveConsent(preferences) {
        const consent = {
            ...preferences,
            timestamp: new Date().toISOString()
        };
        
        // Save to cookie
        const expires = new Date();
        expires.setDate(expires.getDate() + this.cookieExpiry);
        document.cookie = `${this.cookieName}=${JSON.stringify(consent)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
        
        // Load cookies based on consent
        this.loadCookies(consent);
    }

    getConsent() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === this.cookieName) {
                try {
                    return JSON.parse(decodeURIComponent(value));
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    }

    loadCookies(consent) {
        // Load necessary cookies (always loaded)
        console.log('Loading necessary cookies');

        // Load analytics if consented
        if (consent.analytics) {
            console.log('Loading analytics cookies');
            // Add your analytics code here (e.g., Google Analytics)
            // Example:
            // window.dataLayer = window.dataLayer || [];
            // function gtag(){dataLayer.push(arguments);}
            // gtag('js', new Date());
            // gtag('config', 'YOUR-GA-ID');
        }

        // Load marketing if consented
        if (consent.marketing) {
            console.log('Loading marketing cookies');
            // Add your marketing cookies here
        }
    }

    // Method to show settings from footer link
    openSettings() {
        this.showSettings();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
});

// Function to open cookie settings from footer link
function openCookieSettings() {
    if (window.cookieConsent) {
        window.cookieConsent.openSettings();
    }
}