export interface SlideBlock {
  title: string;
  question?: string;
  points: string[];
  imageKeyword: string;
  imageCaption?: string;
  imagePrompt?: string; // For AI generation
  generatedImageUrl?: string; // Cache for generated image
  localImage?: string; // The locally generated image for caching
}

export interface PresentationSlide {
  id: number;
  theme: string;
  title: string;
  blocks: SlideBlock[];
}

export const slides: PresentationSlide[] = [
  {
    id: 1,
    theme: "Theme 1",
    title: "The Basics of Perception & Camera Models",
    blocks: [
      {
        title: "Q1: Color Perception & Mixing",
        question: `Briefly answer the following questions:\n* a) how does the human visual system perceives color?\n* b) What does the color mixing theory tells us? How do we use this theory to capture color images, display color images, and print color images respectively?\n* c) What are the three attributes of a color?`,
        points: [
          "**(a)** The human being perceives color through different types of cones in the retina, sensitive to different parts of the visible spectrum, corresponding to red, green and blue colors primarily. The human brain fuses the received signals from these cones and gives sensations of different colors depending on the combinations of the responses from these cones.",
          "**(b)** The color mixing theory tells us that any color can be obtained by mixing three primary colors in an appropriate proportion.",
          "To capture a color image, we use different sensors that are sensitive to each of three primary colors;",
          "To display a color image, we excite three types of phosphors at each screen location that emits three separate primary colors;",
          "To print a color image, we use three types of color inks.",
          "For capture and display, we use primary colors for illuminating light sources, mainly red, green and blue; For printing, we use primary colors for reflecting light sources, namely cyan, magenta, and yellow.",
          "**(c)** The three attributes of a color are: intensity (or luminance), hue and saturation."
        ],
        imageKeyword: "spectrum",
        imageCaption: "Visible spectrum and RGB cones",
        imagePrompt:
          "Diagram of human eye retina cones sensitive to red green blue light, followed by additive and subtractive color mixing theory, illustrating capture, display, and print paradigms.",
        localImage: "/images/q1_color_perception.png",
      },
      {
        title: "Q2: Pinhole Camera Model",
        question: `Consider a pinhole camera model with an image plane 1 meter from the center of projection. \n* Suppose we have a cube 1 meter on a side positioned so that the optical axis goes through the center of one edge and out through the center of the diagonally opposite edge. \n* The nearest edge is one meter from the center of projection. \n* Sketch the shape of the projection.`,
        points: [
          "In a pinhole camera model, the basic idea is that light from a scene passes through a small aperture (the pinhole) and projects an inverted image onto a screen or image plane. The position and size of objects in the scene affect how they are projected.",
          "Let's consider a cube with one side parallel to the image plane, positioned so the optical axis goes through the center of one edge and out through the diagonally opposite edge.",
          "The nearest edge is one meter from the center of projection, so one corner will be one meter away along the optical axis.",
          "The cube's projection will be inverted on the image plane due to the nature of pinhole camera projection.",
          "The final shape of the projection forms an inverted *frustum* (which is the graphical shape of a truncated pyramid, resembling a smaller square suspended inside a larger square)."
        ],
        imageKeyword: "camera_obscura",
        imageCaption: "Pinhole camera projection model",
        imagePrompt:
          "Technical diagram of a pinhole camera projecting an inverted image of a cube onto a screen, showing the center of projection, optical axis, and the projection shape as an inverted frustum.",
        localImage: "/images/q2_pinhole_camera.png",
      },
      {
        title: "Q16: Perspective Projection & FOV",
        question: `Consider a perfect perspective projection camera with focal length 24 mm and a CCD array of size 16 mm×12 mm, containing 500×500 pixels. \n* 1. Give a general expression for computing FOV from focal length and image width. \n* 2. Compute the horizontal FOV and vertical FOV. \n* 3. Comment on how FOV affects resolution. \n* 4. Give an expression for computing the pixel coordinates in a 3D scene that is given in camera-frame coordinates.`,
        points: [
          "**1.** General expression for computing FOV: $FOV = 2 \\times \\arctan(\\frac{w}{2f})$, where $w$ is the physical sensor width and $f$ is the focal length.",
          "**2.** $FOV_h = 2 \\times \\arctan(\\frac{16}{2 \\times 24}) \\approx 36.87^\\circ$ and $FOV_v = 2 \\times \\arctan(\\frac{12}{2 \\times 24}) \\approx 28.07^\\circ$.",
          "**3. How FOV affects resolution:** An increased FOV allows the camera to capture a broader area of the scene, but given a fixed number of pixels on the CCD sensor, this larger area is covered by the same number of pixels. This directly reduces the spatial resolution (less detail) of any single object captured within the scene.",
          "**4. Pixel coordinates:** For a point $(X_c, Y_c, Z_c)$: $u = \\frac{f \\cdot X_c}{Z_c} + c_x$ and $v = \\frac{f \\cdot Y_c}{Z_c} + c_y$."
        ],
        imageKeyword: "perspective",
        imageCaption: "Field of View geometry",
        imagePrompt:
          "Geometry diagram showing camera Field of View (FOV) calculation with focal length and sensor size",
        localImage: "/images/q16_fov_geometry.png",
      },
      {
        title: "Q15: Intrinsic Camera Parameters",
        question: `What are intrinsic camera parameters?`,
        points: [
          "Intrinsic camera parameters are a set of parameters that describe the internal geometric properties and characteristics of a camera system. These stay constant and are typically determined during camera calibration.",
          "**Focal Length ($f_x, f_y$)**: The distance between the camera's optical center and the image plane, measured in millimeters. Determines magnification, FOV, and perspective distortion.",
          "**Principal Point ($c_x, c_y$)**: The image coordinates (in pixels) of the camera's optical center, where the optical axis intersects the image plane. It represents the center and affects alignment.",
          "**Skew ($s$)**: Accounts for any non-orthogonality between the image axes (x and y) due to manufacturing imperfections. Typically close to zero.",
          "These parameters represent the Camera Intrinsic Matrix K: $K=\\begin{bmatrix}f_{x}&s&c_{x}\\\\ 0&f_{y}&c_{y}\\\\ 0&0&1\\end{bmatrix}$."
        ],
        imageKeyword: "lens",
        imageCaption: "Camera lens and sensor geometry",
        imagePrompt:
          "Diagram of camera intrinsic parameters including focal length, principal point, and image plane",
        localImage: "/images/q15_intrinsic_params.png",
      },
    ],
  },
  {
    id: 2,
    theme: "Theme 2",
    title: "Image Processing & Filtering",
    blocks: [
      {
        title: "Q4: Smoothing Techniques",
        question: `In what situations is it useful to apply a smoothing operation to an image? Compare averaging and median filtering as methods of smoothing. What are the advantages and disadvantages of each?`,
        points: [
          "**Situations finding smoothing useful:**",
          "1. Noise Reduction: Smooths unwanted sensor/compression noise making the image visually cleaner.",
          "2. Edge Preservation: Certain smoothing methods reduce noise while maintaining important edges.",
          "3. Preprocessing: Simplifies image structures to improve subsequent computer vision tasks like object detection.",
          "**Averaging Filtering:**",
          "• *Advantages*: Simple to implement; effective for reducing random noise; preserves global image structure.",
          "• *Disadvantages*: May blur edges and details, as it applies a uniform smoothing kernel; less effective against impulse (salt-and-pepper) noise.",
          "**Median Filtering:**",
          "• *Advantages*: Highly effective for removing impulse noise without blurring edges; preserves edges and fine details better than averaging.",
          "• *Disadvantages*: More computationally expensive; less effective for reducing strictly random noise."
        ],
        imageKeyword: "noise",
        imageCaption: "Noise reduction comparison",
        imagePrompt:
          "Comparison of noisy image vs smoothed image using averaging and median filters",
        localImage: "/images/q4_smoothing.png",
      },
      {
        title: "Q17: Gaussian Smoothing",
        question: `Explain the purpose of Gaussian smoothing in image processing. How does the choice of the kernel size and standard deviation (σ) affect the output?`,
        points: [
          "**Purpose of Gaussian Smoothing**: Used to reduce noise and detail in an image by blurring it. It is particularly effective for removing high-frequency noise while preserving edges and structures.",
          "**Effect of Kernel Size**: A larger kernel size results in more blurring, as it averages over a larger neighborhood of pixels.",
          "**Effect of Standard Deviation ($\\sigma$)**: A larger $\\sigma$ spreads the smoothing effect over a wider area, resulting in a more blurred image. A smaller $\\sigma$ retains more details."
        ],
        imageKeyword: "blur",
        imageCaption: "Gaussian blur effect",
        imagePrompt:
          "Visualizing Gaussian smoothing kernel and its effect on an image with different sigma values",
        localImage: "/images/q17_gaussian.png",
      },
      {
        title: "Q7: Gaussian vs Box Filter",
        question: `Why is a Gaussian filter preferred to a box filter?`,
        points: [
          "A box filter often leads to image artifacts called ringing. The Gaussian filter does not do that.",
          "**Smoothing Effect**: A Gaussian filter provides a smoother and more natural-looking result compared to a box filter.",
          "This is because the Gaussian filter applies a weighted average to neighboring pixels based on their distance from the center point, resulting in a more gradual and visually pleasing blur.",
          "In contrast, a box filter applies a uniform average to neighboring pixels, which can lead to abrupt transitions and noticeable artifacts in the smoothed image."
        ],
        imageKeyword: "wave",
        imageCaption: "Gaussian vs Box filter frequency response",
        imagePrompt:
          "Graph comparing Gaussian filter curve vs Box filter square wave and their frequency responses.",
        localImage: "/images/q7_gaussian_vs_box.png",
      },
      {
        title: "Q11: Filter Separability",
        question: `For each filter given below, answer the following questions.\n* a) Is it a separable filter? If yes, present the horizontal and vertical filters.\n* b) What is the functionality of the filter? Explain your reasoning.`,
        points: [
          "**Filter H1**: Non-separable. Functionality: High-emphasis filter because its coefficients sum to 1, but it possesses both positive and negative values aggressively radiating from the center.",
          "**Filter H2**: Separable into vertical passing and horizontal weighting array. Functionality: It acts as an edge detector; smoothing vertically whilst applying varying detection along horizontal axes to trace horizontal edges exactly."
        ],
        imageKeyword: "matrix",
        imageCaption: "Filter kernels",
        imagePrompt:
          "Matrix representation of image processing filters showing separable vs non-separable kernels",
        localImage: "/images/q11_filter_kernels.png",
      },
      {
        title: "Q8: Image Sharpening",
        question: `What do you do to sharpen an image?`,
        points: [
          "Scale the intensities of an image by 2 and then subtract from the result a smoothed version of the original image. Essentially, apply an impulse filter of amplitude 2, separately apply an averaging filter and subtract this from the former.",
          "Alternatively, using the unsharp mask filter:",
          "1. **Apply a Gaussian Blur**: Start by applying a Gaussian blur to the image to smooth out noise and small details, creating a \"blurred\" version.",
          "2. **Subtract the Blurred Image from Original**: Subtract the blurred image from the original image to obtain an \"edge map\" that highlights the differences between neighboring pixels.",
          "This step enhances the contrast of edges and fine details natively."
        ],
        imageKeyword: "sharpen",
        imageCaption: "Unsharp masking process",
        imagePrompt:
          "Step by step diagram of unsharp masking: Original minus Blurred equals Edge Map",
        localImage: "/images/q8_unsharp_masking.png",
      },
      {
        title: "Q18: Histogram Equalization",
        question: `What is the purpose of a histogram equalization in image processing?`,
        points: [
          "Histogram equalization is a technique used in image processing to enhance contrast by redistributing the intensity values of an image.",
          "It works by computing the cumulative distribution function (CDF) of pixel intensities and mapping the original values to a more uniform distribution, effectively spreading out frequent intensity levels.",
          "This flattens the histogram so that intensities occupy the full available range (making dark areas brighter, and bright areas darker).",
          "It improves visibility in images with poor contrast, making details in dark or bright regions more distinguishable.",
          "Widely used in medical imaging, remote sensing, and facial recognition where ensuring better visual clarity is necessary."
        ],
        imageKeyword: "contrast",
        imageCaption: "Histogram equalization effect",
        imagePrompt:
          "Image histogram before and after equalization showing improved contrast",
        localImage: "/images/q18_histogram_equalization.png",
      },
    ],
  },
  {
    id: 3,
    theme: "Theme 3",
    title: "Feature Extraction & Matching",
    blocks: [
      {
        title: "Q5: Matching in Computer Vision",
        question: `What are some ways that matching is employed in computer vision, and why is it often a hard problem?`,
        points: [
          "Matching finds correspondences between objects/features in different images. Employed in:",
          "• **Feature Matching**: Identifying distinctive keypoints for image alignment, object recognition, and stitching.",
          "• **Template Matching**: Comparing a template (patch) across an image to find occurrences (object detection/localization).",
          "• **Object Detection**: Matching items to known object models or templates (scene understanding).",
          "• **Stereo Matching**: Finding corresponding points in stereo image pairs to construct 3D depth maps.",
          "• **Shape Matching**: Comparing the shape of objects to determine similarities (shape recognition).",
          "**Why it's hard**: Matching remains incredibly complex due to geometric changes, scaling mismatches, heavy scene occlusions, lighting differentials, and background noise."
        ],
        imageKeyword: "puzzle",
        imageCaption: "Feature matching",
        imagePrompt:
          "Computer vision feature matching example showing connecting lines between two images",
        localImage: "/images/q5_feature_matching.png",
      },
      {
        title: "Q6: Homogeneous Coordinates",
        question: `What are the advantages of using homogeneous coordinates in image transformation? Give an example.`,
        points: [
          "**Uniform Representation**: Homogeneous coordinates provide a unified representation for points, vectors, and transformations in a projective space. This simplifies mathematical algorithms by treating translation, rotation, and scaling uniformly.",
          "**Simplifies Translation**: In Cartesian format, translation involves adding coordinates, which is mathematically disjointed from scaling (multiplication). Homogeneous matrices allow strict matrix multiplication.",
          "This permits developers to merge endless sequences of rotations, offsets, scaling steps natively together back-to-back strictly through a single compounded sequence multiplication."
        ],
        imageKeyword: "geometry",
        imageCaption: "Projective geometry",
        imagePrompt:
          "Mathematical visualization of homogeneous coordinates in projective geometry",
        localImage: "/images/q6_projective_geometry.png",
      },
      {
        title: "Q9: Corner & Edge Detection",
        question: `* (a) State briefly how we can detect corners in an image.\n* (b) List the main 3-5 steps of the Canny edge detector and SIFT algorithm.`,
        points: [
          "**(a) Corner Detection:**",
          "• *Gradient Calculation*: Compute gradients (e.g., Sobel) to highlight regions with significant intensity changes.",
          "• *Structure Tensor*: Compute a structure tensor matrix summarizing local gradient info.",
          "• *Corner Response Function*: Use properties (eigenvalues) of the tensor to score cornerness (Harris or Shi-Tomasi).",
          "• *Thresholding & Non-maximum suppression*: Retain only the strongest corner candidates.",
          "**(b) Canny edge detector steps:**",
          "1. Filter the image with derivatives of Gaussians.",
          "2. Find the magnitude and orientation of the gradient.",
          "3. Find locations where the magnitude exceeds a threshold.",
          "4. Perform non-maximum suppression to thin fat edges.",
          "5. Perform hysteresis thresholding to complete edges.",
          "**(b) SIFT algorithm steps:**",
          "1. Scale-space Extrema Detection.",
          "2. Keypoint Localization.",
          "3. Orientation Assignment.",
          "4. Descriptor Calculation.",
          "5. Keypoint Matching (Optional)."
        ],
        imageKeyword: "edge_detection",
        imageCaption: "Canny vs SIFT",
        imagePrompt:
          "Visual comparison of Canny edge detection output and SIFT keypoints on an image",
        localImage: "/images/q9_canny_vs_sift.png",
      },
      {
        title: "Q10: 2D Affine Models",
        question: `How many parameters (or degrees of freedom) are there in a 2D affine model?`,
        points: [
          "In a 2D affine transformation model, there are **6 parameters or degrees of freedom**.",
          "These parameters define the transformation matrix that maps points from one 2D coordinate system to another:",
          "• $a$ and $d$ represent scaling factors in the x and y directions, respectively.",
          "• $b$ and $c$ represent shearing factors in the x and y directions, respectively.",
          "• $t_x$ and $t_y$ represent translations in the x and y directions.",
          "Each parameter contributes one independent degree of freedom, dictating scaling limits, absolute position, orientation bounds, and skew shear capabilities."
        ],
        imageKeyword: "transform",
        imageCaption: "Affine transformations",
        imagePrompt:
          "Diagram showing 2D affine transformations: Scale, Shear, Translate, Rotate",
        localImage: "/images/q10_affine_transformations.png",
      },
    ],
  },
  {
    id: 4,
    theme: "Theme 4",
    title: "Machine Learning in Vision",
    blocks: [
      {
        title: "Q13: Machine Learning Categories",
        question: `Describe the three main categories of Machine Learning and their subtypes and give example algorithms and applications for each of them.`,
        points: [
          "**1. Supervised Learning**: The algorithm learns from labeled target data.",
          "• *Subtypes*: Classification (categorical output) and Regression (continuous numerical output).",
          "• *Example Algorithms*: SVM, Decision Trees, Random Forest, Logistic Regression.",
          "• *Applications*: Email spam detection, medical diagnosis, housing price prediction.",
          "**2. Unsupervised Learning**: The algorithm learns from unlabeled data to uncover hidden patterns.",
          "• *Subtypes*: Clustering (segmenting similar characteristic data points) and Dimensionality Reduction (extracting the core representation).",
          "• *Example Algorithms*: K-means clustering, PCA, Autoencoders.",
          "• *Applications*: Customer/market basket analytics, data compression.",
          "**3. Reinforcement Learning**: Algorithm learns to make sequential decisions by interacting with an environment through penalties and rewards.",
          "• *Subtypes*: Model-based RL and Model-free RL.",
          "• *Example Algorithms*: Q-learning, MCTS, DQN.",
          "• *Applications*: Game playing (AlphaGo), autonomous driving, robotics control."
        ],
        imageKeyword: "ai_robot",
        imageCaption: "Types of Machine Learning",
        imagePrompt:
          "Illustration of Supervised vs Unsupervised vs Reinforcement Learning concepts",
        localImage: "/images/q13_ml_types.png",
      },
      {
        title: "Q3: K-Nearest Neighbors (KNN)",
        question: `What is k-nearest neighbor classification? How does it differ from nearest neighbor classification? Describe a situation in which it might work better than nearest-neighbor classification.`,
        points: [
          "K-Nearest Neighbor (KNN) classification is a type of supervised learning algorithm where the class of a data point is determined by the class of the **majority** of its $k$ nearest neighbors in the feature space.",
          "**Difference**: The primary difference lies in the number of neighbors considered. Nearest Neighbor only considers the single closest point ($k=1$), making it highly susceptible to noise. KNN uses a broader majority vote ($k>1$) for robust decision-making.",
          "**Situations where it works better**:",
          "• *Noise Reduction*: If the dataset contains extreme outliers, higher $k$ points ignore the interference of rogue data.",
          "• *Smoothing Effect*: Introduces smoothing constraints heavily resolving local fluctuations natively.",
          "• *Improved Generalization*: Balancing logic on neighborhoods rather than isolated nodes drives powerful generalization on totally unseen data pools."
        ],
        imageKeyword: "clustering",
        imageCaption: "KNN Classification",
        imagePrompt:
          "Diagram of K-Nearest Neighbors classification showing k=1 vs k=5 decision boundaries",
        localImage: "/images/q3_knn.png",
      },
      {
        title: "Q14: SVM & Non-Linear Data",
        question: `Describe in detail how you would use the linear Support Vector Machine (SVM) to classify two classes that are not linearly separable.`,
        points: [
          "When dealing with two classes that are not linearly separable natively, a localized linear SVM alone may not be sufficient for accurate classification.",
          "However, SVM can process this seamlessly by mapping the input coordinate data into a massive artificially higher-dimensional space where classes intrinsically become directly separable.",
          "This is frequently executed via **Kernel Methods** (e.g. the Kernel Trick). The complex non-linear boundary maps into a flat scalable hyperplane across higher magnitude dimensions mapping strictly linear SVM operations back down perfectly.",
          "Additionally, if classes are inherently imbalanced upon projection, data transformation such as explicit class-weighting and dataset oversampling bounds algorithms against isolated overcorrection."
        ],
        imageKeyword: "hyperplane",
        imageCaption: "SVM Kernel Trick",
        imagePrompt:
          "Visualization of SVM Kernel Trick mapping 2D non-separable data to 3D separable space",
        localImage: "/images/q14_svm.png",
      },
      {
        title: "Q12: Neural Networks & Overfitting",
        question: `What is overfitting in the context of neural networks? Describe three techniques to prevent overfitting.`,
        points: [
          "**Overfitting**: Occurs when a model learns the training data too well, memorizing the innate noise and outliers found strictly in isolated training batches, which heavily results in poor generalization to new, unseen test data.",
          "**Techniques to Prevent Overfitting**:",
          "1. *Data Augmentation*: Actively increases dataset size organically by randomly scaling, modifying, and transforming (e.g., rotation/flipping) raw training pools.",
          "2. *Regularization*: Introducing numerical penalty algorithms natively appended into deep loss function mathematics to harshly decouple immense data weights (such as isolated L2 penalty algorithms).",
          "3. *Dropout Patterns*: Temporarily disabling active routing node networks during the training loops explicitly preventing artificial neural node co-dependencies."
        ],
        imageKeyword: "neural_network",
        imageCaption: "Overfitting vs Generalization",
        imagePrompt:
          "Graph comparing training loss and validation loss over time, clearly indicating the point where overfitting begins as validation loss increases while training loss continues to decrease.",
        localImage: "/images/q12_overfitting.svg",
      },
    ],
  },
];
