# Project Images Guide

## Adding Images to Your Projects

To add images to your project gallery, place your images in the `public/images/projects/` directory and update the ProjectCard components.

### Directory Structure:
```
public/images/projects/
├── bypass-engine/
│   ├── image1.jpg
│   ├── image2.jpg
│   └── ...
├── boiler-bus/
│   ├── image1.jpg
│   ├── image2.jpg
│   └── ...
└── other-projects/
    ├── image1.jpg
    └── ...
```

### Image Requirements:
- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 1920x1080 or similar 16:9 aspect ratio
- **File size**: Keep under 2MB for fast loading
- **Naming**: Use descriptive names (e.g., `front-view.jpg`, `assembly-exploded.png`)

### Image Types to Include:
- Multiple angles of your CAD models
- Exploded views showing internal components  
- Assembly sequences
- Simulation results (stress analysis, flow visualization)
- Manufacturing drawings
- Physical prototypes (if available)
- Comparison views (before/after optimization)

### Adding Images to Code:
Once you have your images ready, update the ProjectCard components in `src/app/page.tsx` with the `images` prop:

```typescript
<ProjectCard
  title="Bypass Engine Assembly"
  // ... other props
  images={[
    '/images/projects/bypass-engine/front-view.jpg',
    '/images/projects/bypass-engine/side-view.jpg',
    '/images/projects/bypass-engine/exploded-view.jpg',
    // ... up to 20 images
  ]}
/>
```

### Tips:
- Use consistent naming conventions
- Optimize images for web (use tools like TinyPNG)
- Consider adding captions in the future
- Order images logically (overview → details → analysis)