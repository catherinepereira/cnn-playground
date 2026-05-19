# CNN Playground

Browser-side playground for seeing what convolutions do to an image

Three modes:

- **Single Conv**: animated kernel sliding over an image, with the 3×3 multiply-add math for the position under the cursor.
- **Playground**: edit kernel values, switch stride and padding, watch the output update.
- **Multi-Layer**: stack up to 3 conv layers with ReLU and 2×2 max pool, see feature maps evolve.