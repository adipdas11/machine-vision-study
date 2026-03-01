import { 
  Eye, 
  Camera, 
  Brain, 
  Layers, 
  Scan, 
  Grid3X3, 
  Activity, 
  Aperture, 
  Maximize, 
  Minimize, 
  BoxSelect, 
  Network, 
  ListTree, 
  GitBranch, 
  Settings, 
  Ruler, 
  BarChart 
} from 'lucide-react';

export type Theme = 'Color Vision' | 'Geometry & Cameras' | 'Image Processing' | 'Feature Detection' | 'Machine Learning';

export interface Question {
  id: number;
  theme: Theme;
  title: string;
  question: string;
  answer: string;
  icon: any;
  visualKeyword: string; // For picsum or similar
}

export const questions: Question[] = [
  {
    id: 1,
    theme: 'Color Vision',
    title: 'Human Visual System & Color Theory',
    question: 'a) How does the human visual system perceive color? b) What does the color mixing theory tell us? How do we use this theory to capture, display, and print color images? c) What are the three attributes of a color?',
    answer: `### (a) Human Perception
The human visual system perceives color through **cones** in the retina.
*   These cones are sensitive to different parts of the visible spectrum: **Red**, **Green**, and **Blue**.
*   The brain fuses signals from these cones to create the sensation of different colors.

### (b) Color Mixing Theory
This theory states that any color can be obtained by mixing three primary colors in appropriate proportions.

*   **Capture:** We use sensors sensitive to **Red, Green, and Blue** (RGB).
*   **Display:** Screens use phosphors or LEDs that emit **Red, Green, and Blue** light (**Additive** mixing).
*   **Print:** Printers use **Cyan, Magenta, and Yellow** inks (**Subtractive** mixing) to reflect light.

### (c) Attributes of Color
1.  **Intensity (or Luminance):** The brightness of the color.
2.  **Hue:** The dominant wavelength (e.g., "red", "orange").
3.  **Saturation:** The purity or vividness of the color.`,
    icon: Eye,
    visualKeyword: 'prism'
  },
  {
    id: 2,
    theme: 'Geometry & Cameras',
    title: 'Pinhole Camera Projection',
    question: 'Consider a pinhole camera model with an image plane 1 meter from the center of projection. Sketch the shape of the projection of a cube positioned specifically along the optical axis.',
    answer: `In a pinhole camera, light passes through a small aperture to project an inverted image.

For the described cube:
1.  **Setup:** Image plane is 1m from center. Cube is 1m side. Nearest edge is 1m away.
2.  **Projection:** The cube's projection will be inverted.
3.  **Geometry:** Since the nearest edge is 1m away and the image plane is 1m away, the magnification ratio for the front face is 1:1. The back face is further away (2m), so it will appear smaller (0.5x scale).
4.  **Visual:** It looks like a square inside a larger square (a frustum view), but inverted.`,
    icon: Camera,
    visualKeyword: 'geometry'
  },
  {
    id: 3,
    theme: 'Machine Learning',
    title: 'K-Nearest Neighbor (KNN)',
    question: 'What is k-nearest neighbor classification? How does it differ from nearest neighbor? Describe a situation where it works better.',
    answer: `**KNN** is a supervised classification algorithm where a data point's class is determined by the majority class of its 'k' nearest neighbors.

**Difference:**
- **Nearest Neighbor (k=1):** Uses only the single closest point. Sensitive to noise.
- **KNN (k>1):** Uses a vote from multiple neighbors. Smoother decision boundaries.

**Better Situation:**
- **Noisy Data:** If a dataset has outliers (e.g., a blue dot accidentally inside a red cluster), k=1 would misclassify nearby points. k=5 would ignore the outlier and classify correctly based on the surrounding cluster.`,
    icon: Network,
    visualKeyword: 'clustering'
  },
  {
    id: 4,
    theme: 'Image Processing',
    title: 'Smoothing: Average vs Median',
    question: 'When is smoothing useful? Compare averaging and median filtering.',
    answer: `**Usefulness:** Reduces noise, suppresses high frequencies, and bridges small gaps in lines.

**Comparison:**
- **Averaging (Mean):** Replaces pixel with average of neighbors.
    - *Pros:* Fast, smooths random noise.
    - *Cons:* Blurs edges significantly.
- **Median:** Replaces pixel with median of neighbors.
    - *Pros:* Preserves edges better; Excellent for "Salt and Pepper" (impulse) noise.
    - *Cons:* Slower to compute.`,
    icon: Layers,
    visualKeyword: 'blur'
  },
  {
    id: 5,
    theme: 'Feature Detection',
    title: 'Matching in Computer Vision',
    question: 'What are ways matching is employed in computer vision, and why is it hard?',
    answer: `**Applications:**
- **Stereo Vision:** Matching points in left/right images for depth.
- **Motion/Tracking:** Matching points across frames (Optical Flow).
- **Object Recognition:** Matching features to a database.
- **Image Stitching:** Panoramas.

**Why it's hard:**
- Occlusions (hidden parts).
- Scale/Rotation changes.
- Lighting variations.
- Ambiguity (repetitive patterns like a fence).`,
    icon: Scan,
    visualKeyword: 'puzzle'
  },
  {
    id: 6,
    theme: 'Geometry & Cameras',
    title: 'Homogeneous Coordinates',
    question: 'What are the advantages of using homogeneous coordinates in image transformation? Give an example.',
    answer: `**Advantages:**
1.  **Unified Math:** Represents translation, rotation, and scaling as a single matrix multiplication.
2.  **Points at Infinity:** Can represent points at infinity (vanishing points).
3.  **Linearity:** Makes perspective projection a linear operation.

**Example:**
Translation in 2D $(x, y) \to (x+t_x, y+t_y)$ is not linear.
In Homogeneous $(x, y, 1)$, it becomes a matrix multiplication:
$$
\\begin{bmatrix} 1 & 0 & t_x \\\\ 0 & 1 & t_y \\\\ 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix}
$$`,
    icon: Grid3X3,
    visualKeyword: 'matrix'
  },
  {
    id: 7,
    theme: 'Image Processing',
    title: 'Gaussian vs Box Filter',
    question: 'Why is a Gaussian filter preferred to a box filter?',
    answer: `**Preference:** Gaussian is preferred because it is **isotropic** (rotationally symmetric) and decays smoothly.

**Box Filter Issues:**
- Has sharp edges in the frequency domain (sinc function), causing "ringing" artifacts.
- Not rotationally invariant (smoothing behaves differently on diagonals).

**Gaussian Benefits:**
- No ringing.
- Models physical diffusion well.
- Separable (efficient).`,
    icon: Activity,
    visualKeyword: 'wave'
  },
  {
    id: 8,
    theme: 'Image Processing',
    title: 'Image Sharpening',
    question: 'What do you do to sharpen an image?',
    answer: `To sharpen an image, we amplify the high frequencies (edges).

**Method (Unsharp Masking):**
1.  Create a blurred (smoothed) version of the image.
2.  Subtract the blurred version from the original (this leaves just the details/edges).
3.  Add these details back to the original image.

**Formula:** $I_{sharp} = I + \alpha(I - I_{smooth})$`,
    icon: Aperture,
    visualKeyword: 'contrast'
  },
  {
    id: 9,
    theme: 'Feature Detection',
    title: 'Corner Detection, Canny & SIFT',
    question: '(a) How to detect corners? (b) List main steps of Canny and SIFT.',
    answer: `**(a) Corner Detection:** Look for windows where intensity shifts significantly in *all* directions (e.g., Harris Corner Detector uses eigenvalues of the structure tensor).

**(b) Canny Edge Detector:**
1.  Gaussian Smoothing.
2.  Gradient Calculation (Sobel).
3.  Non-maximum Suppression (thinning).
4.  Hysteresis Thresholding (linking).

**(b) SIFT Algorithm:**
1.  Scale-space extrema detection.
2.  Keypoint localization.
3.  Orientation assignment.
4.  Keypoint descriptor generation.`,
    icon: Maximize,
    visualKeyword: 'corner'
  },
  {
    id: 10,
    theme: 'Geometry & Cameras',
    title: '2D Affine Model Parameters',
    question: 'How many parameters (degrees of freedom) are there in a 2D affine model?',
    answer: `There are **6 parameters** (Degrees of Freedom).

The transformation matrix is:
$$
\\begin{bmatrix} a & b & t_x \\\\ c & d & t_y \\\\ 0 & 0 & 1 \\end{bmatrix}
$$

They account for:
- Translation (2: $t_x, t_y$)
- Rotation (1)
- Scale (2: $s_x, s_y$)
- Shear (1)
*(Or combined as linear deformation + translation)*`,
    icon: Minimize,
    visualKeyword: 'transform'
  },
  {
    id: 11,
    theme: 'Image Processing',
    title: 'Separable Filters',
    question: 'Analyze the given filters (H1, H2). Are they separable? What is their functionality?',
    answer: `**H1:**
$$ \\frac{1}{4} \\begin{bmatrix} -1 & -2 & -1 \\\\ -2 & 16 & -2 \\\\ -1 & -2 & -1 \\end{bmatrix} $$
- **Separable?** No. It cannot be written as $v \times h^T$.
- **Functionality:** Point/Spot detection or Laplacian-like sharpening. High positive center surrounded by negatives.

**H2:**
$$ \\begin{bmatrix} -1 & -3 & -1 \\\\ 0 & 0 & 0 \\\\ 1 & 3 & 1 \\end{bmatrix} $$
- **Separable?** Yes. Vertical $[-1, 0, 1]^T$ * Horizontal $[1, 3, 1]$.
- **Functionality:** Horizontal Edge Detection (Sobel-like). Responds to vertical changes in intensity.`,
    icon: BoxSelect,
    visualKeyword: 'filter'
  },
  {
    id: 12,
    theme: 'Machine Learning',
    title: 'Overfitting in Neural Networks',
    question: 'What is overfitting? Describe three techniques to prevent it.',
    answer: `**Overfitting:** When a model learns the training data (and its noise) too well, performing poorly on unseen test data.

**Prevention Techniques:**
1.  **Regularization (L1/L2):** Penalizing large weights.
2.  **Dropout:** Randomly deactivating neurons during training to prevent co-adaptation.
3.  **Data Augmentation:** Artificially increasing training data (rotations, flips).
4.  **Early Stopping:** Stopping training when validation loss starts rising.`,
    icon: Brain,
    visualKeyword: 'neural'
  },
  {
    id: 13,
    theme: 'Machine Learning',
    title: 'Categories of Machine Learning',
    question: 'Describe the three main categories of ML, their subtypes, and examples.',
    answer: `1. **Supervised Learning:** Learning with labeled data.
   - *Subtypes:* Classification (discrete), Regression (continuous).
   - *Example:* SVM, Neural Networks.

2. **Unsupervised Learning:** Finding patterns in unlabeled data.
   - *Subtypes:* Clustering, Dimensionality Reduction.
   - *Example:* K-Means, PCA.

3. **Reinforcement Learning:** Learning via rewards/punishment in an environment.
   - *Subtypes:* Model-based, Model-free.
   - *Example:* Q-Learning, AlphaGo.`,
    icon: ListTree,
    visualKeyword: 'robot'
  },
  {
    id: 14,
    theme: 'Machine Learning',
    title: 'SVM for Non-Linear Data',
    question: 'How would you use linear SVM to classify two classes that are not linearly separable?',
    answer: `Use the **Kernel Trick**.

1.  **Concept:** Map the original non-separable data into a higher-dimensional feature space.
2.  **Mechanism:** In this higher dimension, the data often becomes linearly separable by a hyperplane.
3.  **Kernel Functions:** Instead of actually calculating the high-dimensional coordinates (expensive), we use a kernel function $K(x, y)$ that computes the dot product in that space directly.
    - Examples: Polynomial Kernel, Radial Basis Function (RBF).`,
    icon: GitBranch,
    visualKeyword: 'curve'
  },
  {
    id: 15,
    theme: 'Geometry & Cameras',
    title: 'Intrinsic Camera Parameters',
    question: 'What are intrinsic camera parameters?',
    answer: `Intrinsic parameters describe the internal properties of the camera itself, independent of its position in the world.

They include:
1.  **Focal Length ($f_x, f_y$):** Distance from optical center to image plane (in pixels).
2.  **Principal Point ($c_x, c_y$):** Where the optical axis intersects the image plane.
3.  **Skew Coefficient ($s$):** Angle between pixel axes (usually 0).

Represented by the matrix $K$.`,
    icon: Settings,
    visualKeyword: 'lens'
  },
  {
    id: 16,
    theme: 'Geometry & Cameras',
    title: 'Field of View (FOV) Calculation',
    question: 'Compute FOV and pixel coordinates for a specific camera setup (f=24mm, CCD=16x12mm, 500x500px).',
    answer: `1. **FOV Formula:** $FOV = 2 \cdot \arctan(\frac{\text{sensor dimension}}{2 \cdot \text{focal length}})$

2. **Calculation:**
   - $FOV_h = 2 \cdot \arctan(\frac{16}{2 \cdot 24}) = 2 \cdot \arctan(0.333) \approx 36.8^\circ$
   - $FOV_v = 2 \cdot \arctan(\frac{12}{2 \cdot 24}) = 2 \cdot \arctan(0.25) \approx 28.0^\circ$

3. **Resolution:** Larger FOV captures more scene but with less detail per pixel (lower angular resolution).

4. **Pixel Coords:** $u = \frac{f \cdot X}{Z} + c_x$, $v = \frac{f \cdot Y}{Z} + c_y$ (converted to pixels).`,
    icon: Ruler,
    visualKeyword: 'math'
  },
  {
    id: 17,
    theme: 'Image Processing',
    title: 'Gaussian Smoothing Parameters',
    question: 'Explain the purpose of Gaussian smoothing. How do kernel size and sigma affect output?',
    answer: `**Purpose:** To reduce noise and detail (low-pass filter).

**Effects:**
- **Kernel Size:** Determines how many neighbors contribute. Too small = clipped Gaussian (inaccurate). Too large = computationally expensive. Usually $6\sigma$.
- **Standard Deviation ($\sigma$):** Controls the "spread" or amount of blur.
    - Larger $\sigma$ = More blur, less noise, less detail.
    - Smaller $\sigma$ = Less blur, retains more noise/detail.`,
    icon: Activity,
    visualKeyword: 'blur'
  },
  {
    id: 18,
    theme: 'Image Processing',
    title: 'Histogram Equalization',
    question: 'What is the purpose of histogram equalization?',
    answer: `**Purpose:** To enhance contrast.

**Mechanism:**
- It redistributes the pixel intensities so that the histogram becomes approximately uniform (flat).
- It spreads out the most frequent intensity values, effectively increasing the global contrast of images, especially when the usable data is represented by close contrast values (e.g., a dark image).`,
    icon: BarChart,
    visualKeyword: 'chart'
  }
];
