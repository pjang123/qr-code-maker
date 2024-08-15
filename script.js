// Import the QR Code styling library
const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    image: "",
    dotsOptions: {
        color: "#000",
        type: "rounded"
    },
    backgroundOptions: {
        color: "#fff",
    },
    imageOptions: {
        crossOrigin: "anonymous",
    }
});

function generateQRCode() {
    const dataType = document.getElementById('dataType').value;
    const dataInput = document.getElementById('dataInput').value;
    
    let data = '';

    switch(dataType) {
        case 'url':
        case 'text':
        case 'email':
            data = dataInput;
            break;
        case 'image':
        case 'pdf':
            const fileInput = document.getElementById('dataInput').files[0];
            const reader = new FileReader();
            reader.onloadend = function() {
                data = reader.result;
                qrCode.update({
                    data: data
                });
                qrCode.append(document.getElementById('qrCodeContainer'));
                document.getElementById('downloadBtn').style.display = 'block';
            }
            reader.readAsDataURL(fileInput);
            return;
    }

    qrCode.update({
        data: data
    });
    qrCode.append(document.getElementById('qrCodeContainer'));
    document.getElementById('downloadBtn').style.display = 'block';
}

function downloadQRCode() {
    qrCode.download({ name: "qr-code", extension: "png" });
}
