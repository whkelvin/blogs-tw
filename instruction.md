### Product Requirement Document (PRD)  
**Project**: Static Blog with SvelteKit (TypeScript)  
**Domain**: `blogs-tw.yizy.dev` (Cloudflare Pages)  

---

### **Core Features**  
1. **Content Management**  
   - **Markdown Posts**:  
     - Location: `src/posts/[slug].md`  
     - Frontmatter: `title`, `date`, `tags`, `description`  
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
5. **Social Sharing**: Buttons for Twitter/LinkedIn/Facebook on posts.  

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