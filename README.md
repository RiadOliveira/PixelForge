<h1 align="center">PixelForge</h1>

<p align="center">
  PixelForge is a comprehensive web-based platform developed for Digital Image Processing coursework. Built with React and leveraging HTML5 Canvas, it provides an interactive environment to perform advanced image manipulations, transformations, and analysis.
</p>

![image](https://github.com/user-attachments/assets/b3559b39-b4c6-4f14-86b4-95415caf090f)
![image](https://img.shields.io/github/license/RiadOliveira/PixelForge)

<br/>

## Contents
<!--ts-->
* [🛠️ Technologies](#technologies)
* [🚀 Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation & Setup](#setup)
* [⚙️ Features](#features)
  * [Basic Image Operations](#basic-ops)
  * [Geometric Transformations](#geo-transforms)
  * [Color Space Manipulation](#color-spaces)
  * [Pseudocoloring Techniques](#pseudocoloring)
  * [Intensity Transformations](#intensity-transforms)
  * [Image Enhancement](#enhancement)
  * [Filtering Techniques](#filtering)
  * [Image Segmentation](#segmentation)
* [📷 Application Screenshots](#screenshots)
* [📝 License](#license)
* [👨‍💻 Author](#author)
* [🌐 Socials](#socials)
<!--te-->
<br/>

<h2 id="technologies">🛠️ Technologies</h2>
Built with:

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) <br/><br/>

<h2 id="getting-started">🚀 Getting Started</h2>

<h3 id="prerequisites">Prerequisites</h3>

Before running the application, ensure you have:
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)

<h3 id="setup">Installation & Setup</h3>

```bash
# Clone the repository
$ git clone https://github.com/RiadOliveira/PixelForge.git

# Navigate to project directory
$ cd PixelForge

# Install dependencies
$ npm install

# Start the development server
$ npm start
```

<h2 id="features">⚙️ Features</h2>

<h3 id="basic-ops">Basic Image Operations</h3>

- **Multi-format Support**: Load and display images in JPEG, PNG, GIF, TIFF, PGM, and BMP formats.
- **Arithmetic Operations**: Pixel-level addition, subtraction, multiplication, and division between images.
- **Logical Operations**: Bitwise AND, OR, and XOR operations between images.
- **Image Comparison**: Side-by-side comparison tools for analyzing operation results.

<h3 id="geo-transforms">Geometric Transformations</h3>

- **Basic Transformations**: Rotation, scaling, translation, reflection (horizontal/vertical), and shearing (X/Y axes).
- **Composite Transformations**: Custom transformation sequences with user-defined order of operations.
- **Zoom Capabilities**: 
  - Zoom IN with replication and interpolation techniques.
  - Zoom OUT with exclusion and mean-value approaches.

<h3 id="color-spaces">Color Space Manipulation</h3>

- **Color Space Conversion**: RGB to HSB/HSV, YUV and CMYK.
- **Component Isolation**: Display individual channels of each color space.
- **Color Plane Decomposition**: Separate color planes for analysis.

<h3 id="pseudocoloring">Pseudocoloring Techniques</h3>

- **Density Slicing**: Assign specific colors to grayscale intensity ranges.
- **Color Redistribution**: Recolorize images by redistributing existing color values.
- **Histogram-based Coloring**: Automatic color assignment based on image statistics.

<h3 id="intensity-transforms">Intensity Transformations</h3>

- **Linear Transformations**: 
  - Full-range contrast stretching.
  - Piecewise linear transformations with custom breakpoints.
- **Non-linear Transformations**: 
  - Logarithmic, exponential, square, square root, and inverse operations.
  - Binary thresholding with adjustable levels.

<h3 id="enhancement">Image Enhancement</h3>

- **Histogram Equalization**: Global and adaptive histogram equalization.
- **Gamma Correction**: Adjust brightness with non-linear gamma values.
- **Bit-plane Slicing**: Visualize and manipulate individual bit planes.

<h3 id="filtering">Filtering Techniques</h3>

- **Low-pass Filters**: 
  - (3×3, 5×5) Mean, median, mode, min, max.
  - Edge-preserving variants (Kawahara, Tomita-Tsuji, etc.).
- **High-pass Filters**: 
  - Basic kernels (H1, H2, M1-M3).
  - High-boost filtering with adjustable amplification.
- **Halftoning**: 
  - Ordered dithering (2×2, 2x3, 3×3 patterns).
  - Error diffusion algorithms (Floyd-Steinberg, Jarvis-Judice-Ninke, etc.).

<h3 id="segmentation">Image Segmentation</h3>

- **Edge Detection**: 
  - Operators: Roberts, Prewitt, Sobel, Kirsch, Robinson, Laplacian.
  - Directional detection (0°, 45°, 90°, 135°).
- **Thresholding**: 
  - Global threshold selection.
  - Local adaptive methods (mean, Niblack).
- **Region-based**: 
  - Region growing with seed selection.
  - Watershed algorithm with marker control.
- **Feature Extraction**: Point, line, and contour detection. <br/><br/>

<h2 id="screenshots">📷 Application Screenshots</h2>

![image](https://github.com/user-attachments/assets/98ee2a87-283c-4b34-b852-e3171f3a0549)
![image](https://github.com/user-attachments/assets/a67cc46d-4b29-4f1f-aad6-4a9ba5529bd3)
![image](https://github.com/user-attachments/assets/052b716b-1cd1-4c3a-82b7-a15dba843bc4)
![image](https://github.com/user-attachments/assets/326101f7-c306-4e06-8e55-80c7cc16e6c5)
![image](https://github.com/user-attachments/assets/b3559b39-b4c6-4f14-86b4-95415caf090f)
![image](https://github.com/user-attachments/assets/d3163500-bd9d-48f7-bc83-1923a524e399)
![image](https://github.com/user-attachments/assets/403ce42c-d759-4da6-860a-63cfc19285be)

<h2 id="license">📝 License</h2>
This project is MIT Licensed. See <a href="https://github.com/RiadOliveira/PixelForge/blob/main/LICENSE">LICENSE</a> file for more details.

<br/>

<h2 id="author">👨‍💻 Author</h2>

<kbd>
  <a href="https://github.com/RiadOliveira">
    <img src="https://avatars.githubusercontent.com/u/69125013?v=4" width="100" alt="Ríad Oliveira"/>
    <br/><br/>
    <p align="center"><b>Ríad Oliveira</b></p>
  </a>
</kbd>

## 🌐 Socials

<div id="socials">
  <a href = "mailto:riad.oliveira@hotmail.com"><img class="badge" src="https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" target="_blank"/></a>
  <a href = "mailto:riad.oliveira@gmail.com"><img class="badge" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"/></a>
  <a href="https://www.linkedin.com/in/ríad-oliveira" target="_blank"><img class="badge" src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/></a>
</div>
