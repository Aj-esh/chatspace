document.addEventListener('DOMContentLoaded', function() {
    const joinRoomBtn = document.getElementById('join-room-btn');
    if (joinRoomBtn) {
        joinRoomBtn.addEventListener('click', function() {
            const roomAddr = prompt("Please enter the space address:");
            if (roomAddr) {
                window.location.href = "/room/" + roomAddr;
            }
        });
    }

    const createRoomForm = document.getElementById('create-room-form');
    if (createRoomForm) {
        createRoomForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

            fetch(this.action, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const roomAddr = data.room_addr;
                    
                    navigator.clipboard.writeText(roomAddr)
                    .then(() => {
                        alert("Space created, address " + roomAddr + " copied to clipboard.");
                        window.location.href = "/room/" + roomAddr;
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                        alert("Space created at " + roomAddr + ". Failed to copy to clipboard.");
                        window.location.href = "/room/" + roomAddr;
                    });
                } else {
                    alert("Error creating space: " + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred while creating the space.");
            });
        });
    }
});