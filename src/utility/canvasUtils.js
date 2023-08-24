export function drawTextWithShadow(ctx, text, x, y, shadowOffset = 2) {
    const uppercaseText = text.toUpperCase(); 
    
    ctx.font = 'bold 30px impact';
    ctx.textAlign = 'center';
  
    ctx.fillStyle = 'black'; 
    ctx.fillText(uppercaseText, x + shadowOffset, y + shadowOffset);
  
    ctx.fillStyle = 'white';
    ctx.fillText(uppercaseText, x, y);
  }
  
  export function createAndDownloadBlob(canvas, filename) {
    canvas.toBlob((blob) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = filename;
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);
    }, 'image/png');
  }
  