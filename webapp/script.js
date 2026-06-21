const API_URL = "YOUR_BACKEND_URL"; #serverip

document.getElementById("uploadBtn").addEventListener("click", uploadImage);

async function uploadImage() {

    const file = document.getElementById("fileInput").files[0];
    const status = document.getElementById("status");

    if (!file) {
        status.innerText = "Please select an image.";
        return;
    }

    try {

        status.innerText = "Generating upload URL...";

        const response = await fetch(
            `${API_URL}/api/presigned-url?fileName=${file.name}&contentType=${file.type}`
        );

        const data = await response.json();

        status.innerText = "Uploading image...";

        await fetch(data.uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type
            },
            body: file
        });

        status.innerText = "Image uploaded successfully!";

    } catch (error) {
        console.error(error);
        status.innerText = "Upload failed.";
    }
}
