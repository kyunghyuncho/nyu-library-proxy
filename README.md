# NYU Library Proxy

A lightweight Microsoft Edge browser extension (Manifest V3) that redirects the active tab through the NYU Library proxy with a single click.

## Features

- **Left-click** the toolbar icon to redirect the active tab immediately
- **Right-click** the toolbar icon and choose **Configure Proxy** to open settings
- Configurable proxy prefix stored in `chrome.storage.sync` (default: `https://proxy.library.nyu.edu/login?url=`)
- Guards against proxying internal browser pages (`chrome://`, `edge://`) or re-proxying through NYU Library

## Project Structure

```text
nyu-library-proxy/
├── manifest.json
├── background.js
├── options.html
├── options.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Installation (Microsoft Edge)

1. Open Edge and navigate to `edge://extensions`.
2. Enable **Developer mode** in the sidebar.
3. Click **Load unpacked** and select this directory (`nyu-library-proxy`).

## Usage

1. Navigate to a research portal (e.g., [ACM Digital Library](https://dl.acm.org/) or [IEEE Xplore](https://ieeexplore.ieee.org/)).
2. **Left-click** the extension toolbar icon — the tab URL is rewritten as `{proxyPrefix}{encodeURIComponent(currentUrl)}`.
3. **Right-click** the toolbar icon and select **Configure Proxy** to change the proxy prefix.

## Permissions

| Permission      | Purpose                                      |
|----------------|----------------------------------------------|
| `activeTab`    | Read and update the URL of the active tab    |
| `storage`      | Persist the proxy prefix across sessions     |
| `contextMenus` | Add **Configure Proxy** to the icon menu     |

## License

See [LICENSE](LICENSE).
