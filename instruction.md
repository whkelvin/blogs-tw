I want to build a static blog website with sveltekit 5. I am going to write the blog posts in markdown format. I want to be able to track traffic to each page with umami analytics. The home page should be a feed of posts I've written sorted from newest to oldest. Each page should have a nav bar component with a logo, text. and a footer that contains an about me section. 

my markdown files will include metadata like title, date, and description.  The post feed should show dates, titles and description with infinite scroll. The feed will not support filtering. I am going to use tailwind's typography and a very minimalist theme where the background color is #F2F2F0 and the foreground color is #5D6168. The blog will not support dark/light mode. The blog's content should have a default max width of medium device screen size and must be mobile phone friendly. The nav bar should just have a logo that takes you to the home page and a text beside it without any links. The footer section contains the about me content where it'll have my name, profile picture, github links, email and threads link. I want them to be icons the user can click. I'll use cloud umani and I just need page view for each blog post. I don't need search, rss or a comment system. A social sharing button on each post is a good idea. I'll deploy the site to cloudflare pages and I have my own domain blogs-tw.yizy.dev so we will be using the static adapter to build the app. 
Here is the PRD.
### Product Requirement Document (PRD)  
**Project**: Static Blog with SvelteKit (TypeScript)  
**Domain**: `blogs-tw.yizy.dev` (Cloudflare Pages)  

---

### **Core Features**  
1. **Content Management**  
   - **Markdown Posts**:  
     - Location: `src/posts/[slug].md`  
     - Frontmatter: `title`, `date`, `description`  
   - **Infinite Scroll Feed**:  
     - Reverse chronological order, displays `title`, `date`, and `description`.  
     - Load posts dynamically on scroll.  

2. **Design System**  
   - **Colors**: `#F2F2F0` (background), `#5D6168` (text).  
   - **Typography**: Tailwind’s `@tailwindcss/typography`.  
   - **Layout**: Centered `max-w-3xl` container, mobile-first.  

3. **Components**  
   - **Navbar**: Logo + text (no links).  
   - **Footer**: Profile picture, name, social icons (GitHub, Email, Threads).  

4. **Analytics**: Umami Cloud for page views.  
5. **Social Sharing**: Buttons for Twitter/LinkedIn/Facebook/Threads on posts.  

---

### **Technical Specifications**  
#### **1. Folder Structure (TypeScript)**  
```bash
src/
├── lib/
│   ├── posts/          # Markdown parsing utilities
│   └── constants.ts    # Social links, colors
├── routes/
│   ├── [slug]/         # Blog post pages
│   │   └── +page.svelte
│   ├── +page.svelte    # Home feed
│   └── +layout.svelte  # Navbar/Footer
├── app.html            # Umami script
└── static/
    └── images/
       ├── logo.svg
       └── profile.jpg