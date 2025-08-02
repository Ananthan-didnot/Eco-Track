// Carbon Calculator Logic
class CarbonCalculator {
    constructor() {
        this.transportFactors = {
            car: 0.25,    // kg CO2 per km
            bus: 0.05,    // kg CO2 per km
            bike: 0.00    // kg CO2 per km
        };
        this.energyFactor = 0.5; // kg CO2 per kWh
    }

    calculateTransportImpact(distance, mode) {
        return distance * (this.transportFactors[mode] || 0);
    }

    calculateEnergyImpact(usage) {
        return usage * this.energyFactor;
    }

    calculateTotalImpact(distance, mode, energyUsage) {
        const transportImpact = this.calculateTransportImpact(distance, mode);
        const energyImpact = this.calculateEnergyImpact(energyUsage);
        return transportImpact + energyImpact;
    }
}

// Initialize calculator
const calculator = new CarbonCalculator();
const calculateBtn = document.querySelector('.calculate-btn');
const resultsDiv = document.getElementById('results');

// Event listeners for calculator
calculateBtn.addEventListener('click', () => {
    const distance = parseFloat(document.getElementById('transportDistance').value) || 0;
    const energyUsage = parseFloat(document.getElementById('energyUsage').value) || 0;
    const selectedTransport = document.querySelector('input[name="transport"]:checked')?.value || 'car';

    const totalImpact = calculator.calculateTotalImpact(distance, selectedTransport, energyUsage);
    
    resultsDiv.innerHTML = `
        <div class="result-card">
            <h3>Your Weekly Carbon Impact</h3>
            <div class="impact-value">${totalImpact.toFixed(2)} kg CO2</div>
            <div class="impact-breakdown">
                <p>Transport: ${calculator.calculateTransportImpact(distance, selectedTransport).toFixed(2)} kg CO2</p>
                <p>Energy: ${calculator.calculateEnergyImpact(energyUsage).toFixed(2)} kg CO2</p>
            </div>
            <div class="suggestions">
                <h4>Reduce Your Impact:</h4>
                <ul>
                    <li>Consider using public transport or cycling</li>
                    <li>Switch to renewable energy sources</li>
                    <li>Reduce unnecessary travel</li>
                </ul>
            </div>
        </div>
    `;
});

// Habit Tracking Logic
class HabitTracker {
    constructor() {
        this.habits = {
            recycling: { days: 7, target: 10 },
            meatFree: { days: 3, target: 7 },
            activeTransport: { days: 4, target: 5 }
        };
    }

    updateProgress(habit, days) {
        this.habits[habit].days = days;
        this.updateUI(habit);
    }

    updateUI(habit) {
        const progress = (this.habits[habit].days / this.habits[habit].target) * 100;
        const progressBar = document.querySelector(`.${habit}-progress .progress`);
        const progressText = document.querySelector(`.${habit}-progress span`);
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${this.habits[habit].days}/${this.habits[habit].target} days`;
    }
}

// Initialize habit tracker
const habitTracker = new HabitTracker();

// Add event listeners for habit tracking
const habitCards = document.querySelectorAll('.habit-card');
habitCards.forEach(card => {
    card.addEventListener('click', () => {
        const habit = card.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '');
        const currentDays = habitTracker.habits[habit].days;
        const target = habitTracker.habits[habit].target;
        
        if (currentDays < target) {
            habitTracker.updateProgress(habit, currentDays + 1);
        }
    });
});

// Community Actions
const communityActions = [
    {
        title: 'Local Clean-up Drive',
        date: 'Tomorrow, 10 AM',
        description: 'Join us for a community clean-up event at the local park',
        type: 'clean-up'
    },
    {
        title: 'Zero Waste Workshop',
        date: 'This Saturday',
        description: 'Learn how to reduce waste in your daily life',
        type: 'workshop'
    }
];

// Add community actions to DOM
const communityContainer = document.querySelector('.community-container');
communityActions.forEach(action => {
    const actionCard = document.createElement('div');
    actionCard.className = 'action-card';
    actionCard.innerHTML = `
        <div class="action-header">
            <h3>${action.title}</h3>
            <span class="date">${action.date}</span>
        </div>
        <p>${action.description}</p>
        <button class="join-btn">${action.type === 'clean-up' ? 'Join Event' : 'Register'}</button>
    `;
    communityContainer.appendChild(actionCard);
});

// Add animations for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.habit-card, .action-card, .resource-card, .section').forEach(el => {
        observer.observe(el);
    });
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add interactive feedback for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 300);
    });
});
