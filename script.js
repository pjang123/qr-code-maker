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

function updateInputField() {
    const dataType = document.getElementById('dataType').value;
    const dataInputContainer = document.getElementById('dataInputContainer');

    if (dataType === 'image' || dataType === 'pdf') {
        dataInputContainer.innerHTML = '<input type="file" id="dataInput">';
    } else {
        dataInputContainer.innerHTML = '<input type="text" id="dataInput" placeholder="Enter your data here...">';
    }
}

function generateQRCode() {
    const dataType = document.getElementById('dataType').value;
    const dataInput = document.getElementById('dataInput');

    if (dataType === 'image' || dataType === 'pdf') {
        const file = dataInput.files[0];
        if (!file) return alert('Please select a file.');

        const reader = new FileReader();
        reader.onload = function(event) {
            const base64 = event.target.result;
            const base64Length = base64.length;
            
            // Check if the base64 is too large for a QR code
            if (base64Length > 3000) {
                alert('File too large to encode in QR code.');
                return;
            }
            
            qrCode.update({
                data: base64
            });
            qrCode.append(document.getElementById('qrCodeContainer'));
            document.getElementById('downloadBtn').style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        const data = dataInput.value;
        qrCode.update({
            data: data
        });
        qrCode.append(document.getElementById('qrCodeContainer'));
        document.getElementById('downloadBtn').style.display = 'block';
    }
}


function downloadQRCode() {
    qrCode.download({ name: "qr-code", extension: "png" });
}
