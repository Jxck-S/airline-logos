const REPO_OWNER = 'Jxck-S';
const REPO_NAME = 'airline-logos';
const BRANCH = 'main';
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`;
const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}`;

// State
// State
let allAssets = [];

// Confgiuration of folders to scan
const SOURCES = [
    { type: 'logos', path: 'custom_logos', label: 'Custom' },
    { type: 'banners', path: 'custom_banners', label: 'Custom' },
    { type: 'logos', path: 'flightaware_logos', label: 'FlightAware' },
    { type: 'logos', path: 'fr24_logos', label: 'FR24' },
    { type: 'banners', path: 'fr24_banners', label: 'FR24' },
    { type: 'logos', path: 'radarbox_logos', label: 'RadarBox' },
    { type: 'banners', path: 'radarbox_banners', label: 'RadarBox' },
    { type: 'banners', path: 'avcodes_banners', label: 'AvCodes' }
];

async function init() {
    try {
        await Promise.all([
            fetchStandardFolders(),
            fetchCustomAircraft()
        ]);

        document.getElementById('loading').style.display = 'none';
        renderGallery();

        // Setup Search Listener
        document.getElementById('searchInput').addEventListener('input', (e) => {
            renderGallery(e.target.value);
        });

    } catch (err) {
        console.error(err);
        document.getElementById('loading').innerText = 'Error loading assets. API rate limit may be exceeded.';
    }
}

async function fetchStandardFolders() {
    const promises = SOURCES.map(async (source) => {
        const url = `${API_BASE}/${source.path}?ref=${BRANCH}`;
        const resp = await fetch(url);
        if (!resp.ok) return;

        const data = await resp.json();
        if (Array.isArray(data)) {
            data.forEach(file => {
                if (file.name.endsWith('.png')) {
                    const code = file.name.replace('.png', '');
                    const asset = {
                        code: code,
                        url: file.download_url, // Or construct raw URL
                        source: source.label,
                        name: file.name
                    };
                    allAssets.push(asset);
                }
            });
        }
    });

    await Promise.all(promises);
}

// Special handling for custom_aircraft nested structure
async function fetchCustomAircraft() {
    const url = `${API_BASE}/custom_aircraft?ref=${BRANCH}`;
    const resp = await fetch(url);
    if (!resp.ok) return;

    const aircraftDirs = await resp.json();
    if (!Array.isArray(aircraftDirs)) return;

    // Concurrently fetch contents of each aircraft folder
    const aircraftPromises = aircraftDirs.map(async (dir) => {
        if (dir.type !== 'dir') return;

        const aircraftId = dir.name;
        // Check for logos and banners subfolders
        // We can optimistically try to fetch contents/custom_aircraft/ID/logos

        // Logos
        fetch(`${API_BASE}/custom_aircraft/${aircraftId}/logos?ref=${BRANCH}`)
            .then(r => r.ok ? r.json() : [])
            .then(files => {
                if (Array.isArray(files)) {
                    files.forEach(f => {
                        if (f.name.endsWith('.png')) {
                            allAssets.push({
                                code: f.name.replace('.png', ''),
                                url: f.download_url,
                                source: `Custom (${aircraftId})`,
                                type: 'Logo',
                                name: f.name
                            });
                        }
                    });
                }
            });

        // Banners
        fetch(`${API_BASE}/custom_aircraft/${aircraftId}/banners?ref=${BRANCH}`)
            .then(r => r.ok ? r.json() : [])
            .then(files => {
                if (Array.isArray(files)) {
                    files.forEach(f => {
                        if (f.name.endsWith('.png')) {
                            allAssets.push({
                                code: f.name.replace('.png', ''),
                                url: f.download_url,
                                source: `Custom (${aircraftId})`,
                                type: 'Banner',
                                name: f.name
                            });
                        }
                    });
                }
            });
    });

    await Promise.all(aircraftPromises);
}



function renderGallery(filterText = '') {
    const container = document.getElementById('gallery');
    container.innerHTML = '';

    // Use all assets (no tabs)
    const assets = allAssets;
    const filter = filterText.toUpperCase();

    // Deduplicate logic? 
    // The user's combine script prioritizes certain sources.
    // Since we just dumped everything into one array, we might have duplicates.
    // Let's group by Code and pick the best one? 
    // For the viewer, maybe seeing all variants is better? 
    // Let's show ALL for now, or maybe uniquify by code.
    // The requirement was "web viewer", implying looking at the collection.
    // Showing duplicates allows verification. Let's keep duplicates for now but sort them.

    // Group by Code
    const groups = {};
    assets.forEach(asset => {
        if (!groups[asset.code]) groups[asset.code] = [];
        groups[asset.code].push(asset);
    });

    const sortedCodes = Object.keys(groups).sort();

    sortedCodes.forEach(code => {
        if (code.includes(filter)) {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'group-card';

            // Header
            const header = document.createElement('div');
            header.className = 'group-header';
            header.innerText = code;
            groupDiv.appendChild(header);

            // Variants Grid
            const variantsDiv = document.createElement('div');
            variantsDiv.className = 'variants-grid';

            groups[code].forEach(asset => {
                const variantItem = document.createElement('div');
                variantItem.className = 'variant-item';

                variantItem.innerHTML = `
                    <div class="variant-img-wrapper">
                        <img src="${asset.url}" loading="lazy" alt="${asset.code}">
                    </div>
                    <div class="variant-source">${asset.source}</div>
                `;
                variantsDiv.appendChild(variantItem);
            });

            groupDiv.appendChild(variantsDiv);
            container.appendChild(groupDiv);
        }
    });

    if (container.children.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #64748b;">No results found.</div>';
    }
}

// Start
init();

