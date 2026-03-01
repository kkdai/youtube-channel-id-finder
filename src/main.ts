import './style.css';

// DOM Elements
const form = document.getElementById('finder-form') as HTMLFormElement;
const urlInput = document.getElementById('youtube-url') as HTMLInputElement;
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
const btnText = submitBtn.querySelector('.btn-text') as HTMLSpanElement;
const spinner = document.getElementById('loading-spinner') as HTMLDivElement;
const resultContainer = document.getElementById('result-container') as HTMLDivElement;
const errorContainer = document.getElementById('error-container') as HTMLDivElement;
const errorText = document.getElementById('error-text') as HTMLSpanElement;
const channelNameEl = document.getElementById('channel-name') as HTMLHeadingElement;
const channelIdEl = document.getElementById('channel-id') as HTMLElement;
const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;

const apiKeyInput = document.getElementById('api-key') as HTMLInputElement;
const saveKeyBtn = document.getElementById('save-key-btn') as HTMLButtonElement;
const keySavedMsg = document.getElementById('key-saved-msg') as HTMLSpanElement;

// Constants
const API_KEY_STORAGE_KEY = 'youtube_api_key';

// Init
const init = () => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedKey) {
        apiKeyInput.value = savedKey;
    }
};

// Extract Video ID from various YouTube URLs
const extractVideoId = (url: string): string | null => {
    // Regex covers: 
    // youtube.com/watch?v=...
    // youtu.be/...
    // youtube.com/embed/...
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
};

// Show methods
const showLoading = (isLoading: boolean) => {
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        spinner.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        errorContainer.classList.add('hidden');
    } else {
        submitBtn.disabled = false;
        btnText.classList.remove('hidden');
        spinner.classList.add('hidden');
    }
};

const showError = (message: string) => {
    errorText.textContent = message;
    errorContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
};

const showResult = (channelName: string, channelId: string) => {
    channelNameEl.textContent = channelName;
    channelIdEl.textContent = channelId;
    resultContainer.classList.remove('hidden');
    errorContainer.classList.add('hidden');
};

// Copy API setup
copyBtn.addEventListener('click', async () => {
    const channelId = channelIdEl.textContent;
    if (!channelId) return;

    try {
        await navigator.clipboard.writeText(channelId);

        // Visual feedback
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`;

        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy', err);
    }
});

// Save API Key
saveKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
        localStorage.setItem(API_KEY_STORAGE_KEY, key);
        keySavedMsg.classList.remove('hidden');
        setTimeout(() => {
            keySavedMsg.classList.add('hidden');
        }, 3000);
    } else {
        localStorage.removeItem(API_KEY_STORAGE_KEY);
    }
});

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = urlInput.value.trim();
    const apiKey = apiKeyInput.value.trim() || localStorage.getItem(API_KEY_STORAGE_KEY);

    if (!apiKey) {
        showError("Please enter your YouTube API Key in settings first.");
        return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
        showError("Could not extract Video ID. Please check the YouTube URL.");
        return;
    }

    showLoading(true);

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);

        if (!response.ok) {
            if (response.status === 403) throw new Error("API Key invalid or quota exceeded.");
            throw new Error("Failed to fetch data from YouTube API.");
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            throw new Error("Video not found. Is it private or removed?");
        }

        const snippet = data.items[0].snippet;
        const channelId = snippet.channelId;
        const channelTitle = snippet.channelTitle;

        if (!channelId) throw new Error("Could not extract Channel ID from data.");

        showResult(channelTitle, channelId);
    } catch (error) {
        showError(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
        showLoading(false);
    }
});

// Bootstrap
init();
