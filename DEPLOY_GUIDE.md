# Website Deployment Guide

## 🚀 How to Upload Code to GitHub

### Step 1: Prepare GitHub Account
1. Visit [GitHub.com](https://github.com) to register an account (if you don't have one)
2. Verify your email address

### Step 2: Create New GitHub Repository
1. After logging into GitHub, click the "+" icon in the top right corner
2. Select "New repository"
3. Repository name suggestions: `havearest-games` or `game-portal`
4. Set to Public
5. Don't check "Add a README file" (since we already have one)
6. Click "Create repository"

### Step 3: Install Git (if not already installed)
**Windows Users:**
1. Download Git: https://git-scm.com/download/win
2. Install with default options

**Verify Installation:**
Open Command Prompt or PowerShell and type:
```bash
git --version
```

### Step 4: Upload Code to GitHub

1. **Open PowerShell or Command Prompt**
2. **Navigate to your project folder:**
   ```bash
   cd "C:\Users\Tsui\OneDrive\Desktop\Cursor\多游戏网站"
   ```

3. **Initialize Git repository:**
   ```bash
   git init
   ```

4. **Add all files:**
   ```bash
   git add .
   ```

5. **Commit code:**
   ```bash
   git commit -m "Initial commit: Classic HTML5 Games Collection"
   ```

6. **Connect to GitHub repository:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   ```
   **Note:** Replace `YOUR_USERNAME` with your GitHub username and `YOUR_REPOSITORY_NAME` with your repository name

7. **Push code to GitHub:**
   ```bash
   git push -u origin main
   ```

## 🌐 Deploy to Your Website havearest.online

### Method 1: Using GitHub Pages (Recommended for beginners)
1. On your GitHub repository page, click "Settings"
2. Scroll to the "Pages" section
3. Under "Source" select "Deploy from a branch"
4. Select "main" branch
5. Click "Save"
6. GitHub will provide you with a URL like: `https://yourusername.github.io/your-repo-name`

### Method 2: Using Your Domain havearest.online
You need to contact your domain provider or hosting service to upload the following files to your website root directory:

**Files and folders to upload:**
```
├── assets/
├── games/
├── index.html
├── game-frame.html
├── manifest.json
├── sw.js
├── server.js (if using Node.js)
└── README.md
```

### Method 3: Using Hosting Services
1. **Shared Hosting:** Upload all files via FTP or file manager
2. **VPS/Cloud Server:** 
   - Connect via SSH
   - Clone your GitHub repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   ```

## 📝 Updating Website Content

When you need to update your website:

1. **After modifying code, commit:**
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```

2. **If using a server, you can set up auto-deployment:**
   ```bash
   git pull origin main
   ```

## 🔧 Troubleshooting

### Git Push Requires Login
If you encounter authentication issues, use Personal Access Token:
1. Generate Personal Access Token in GitHub settings
2. Use Token instead of password when pushing

### Large Files
If files exceed 100MB, use Git LFS or remove large files

### Chinese Folder Names
Recommend changing folder names to English to avoid encoding issues

## 📞 Need Help?
If you encounter problems:
1. Check GitHub official documentation
2. Contact your hosting service provider
3. Seek technical support

---

**Expected Result:** 
- GitHub Repository: Store and version control your code
- Website Access: Access your game website through havearest.online 