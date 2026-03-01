import matplotlib.pyplot as plt
import numpy as np

# Set high resolution
plt.figure(figsize=(10, 6), dpi=300)

# Generate epochs
epochs = np.arange(1, 51)

# Generate plausible training loss (exponential decay)
train_loss = 2.5 * np.exp(-0.1 * epochs) + 0.2

# Generate validation loss (decays initially, then rises to show overfitting)
val_loss = 2.2 * np.exp(-0.08 * epochs) + 0.002 * (epochs - 20)**2 + 0.3
val_loss[:15] = 2.2 * np.exp(-0.08 * epochs[:15]) + 0.3 # Smooth start

# Plot the losses
plt.plot(epochs, train_loss, label='Training Loss', color='#2563eb', linewidth=3)
plt.plot(epochs, val_loss, label='Validation Loss', color='#ef4444', linewidth=3)

# Highlight the overfitting point
optimum_epoch = 18
plt.axvline(x=optimum_epoch, color='#6b7280', linestyle='--', linewidth=2)
plt.text(optimum_epoch + 1, 1.5, 'Overfitting Begins Here\n(Validation Loss Increases)', 
         color='#b91c1c', fontsize=12, fontweight='bold')

plt.scatter(optimum_epoch, val_loss[optimum_epoch-1], color='#b91c1c', s=100, zorder=5)

# Add clear labels and title
plt.title('Training Loss vs. Validation Loss (Overfitting)', fontsize=16, fontweight='bold', pad=20)
plt.xlabel('Training Epochs', fontsize=14)
plt.ylabel('Error / Loss', fontsize=14)
plt.legend(fontsize=12)

# Styling
plt.grid(True, linestyle='--', alpha=0.7)
plt.tight_layout()

# Save the plot
plt.savefig('C:/Users/adipd/Documents/Paper_Banana/machine-vision-study-companion/public/images/q12_overfitting.png')
print('Generated Q12 plot successfully.')
