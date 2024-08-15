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
        const reader = new FileReader();

        reader.onload = function(event) {
            qrCode.update({
                data: event.target.result
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
