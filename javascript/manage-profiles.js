/* =========================================================
   NETFLIX MANAGE PROFILES - JAVASCRIPT
   ========================================================= */

const profilesGrid = document.getElementById("profiles-grid");
const manageToggleBtn = document.getElementById("manage-toggle-btn");
const doneToggleBtn = document.getElementById("done-toggle-btn");
const screenHeading = document.getElementById("screen-heading");

// Modal elements
const editModal = document.getElementById("edit-modal");
const editNameInput = document.getElementById("edit-profile-name");
const modalAvatarImg = document.getElementById("modal-avatar-img");
const isKidsCheckbox = document.getElementById("is-kids-checkbox");
const saveProfileBtn = document.getElementById("save-profile-btn");
const cancelProfileBtn = document.getElementById("cancel-profile-btn");
const deleteProfileBtn = document.getElementById("delete-profile-btn");

let isManageMode = false;
let currentEditingIndex = null;

const defaultProfilesList = [
    { id: 1, name: "Rahul", avatar: "../assets/images/avatar1.jpg", isKids: false },
    { id: 2, name: "Guest", avatar: "../assets/images/avatar2.jpg", isKids: false },
    { id: 3, name: "Kids", avatar: "../assets/images/avatar3.jpg", isKids: true }
];

function getProfilesList() {
    return JSON.parse(localStorage.getItem("netflixProfiles")) || defaultProfilesList;
}

function saveProfilesList(list) {
    localStorage.setItem("netflixProfiles", JSON.stringify(list));
}

function renderProfiles() {
    if (!profilesGrid) return;
    const profiles = getProfilesList();
    profilesGrid.innerHTML = "";

    profiles.forEach((profile, index) => {
        const card = document.createElement("div");
        card.className = `profile-select-card ${isManageMode ? 'editable' : ''}`;

        card.innerHTML = `
            <div class="avatar-wrapper">
                <img src="${profile.avatar}" alt="${profile.name}" class="avatar-img">
                ${isManageMode ? '<div class="edit-overlay"><i class="fa-solid fa-pen"></i></div>' : ''}
            </div>
            <span class="profile-name">${profile.name}</span>
        `;

        card.addEventListener("click", () => {
            if (isManageMode) {
                openEditModal(index);
            } else {
                selectProfile(profile);
            }
        });

        profilesGrid.appendChild(card);
    });

    // Add Profile Button Card
    if (profiles.length < 5) {
        const addCard = document.createElement("div");
        addCard.className = "profile-select-card add-card";
        addCard.innerHTML = `
            <div class="avatar-wrapper add-wrapper">
                <i class="fa-solid fa-circle-plus"></i>
            </div>
            <span class="profile-name">Add Profile</span>
        `;

        addCard.addEventListener("click", () => {
            addNewProfile();
        });

        profilesGrid.appendChild(addCard);
    }
}

function selectProfile(profile) {
    localStorage.setItem("netflixProfile", JSON.stringify({
        name: profile.name,
        email: "user@example.com",
        avatar: profile.avatar
    }));
    window.location.href = "browse.html";
}

function toggleManageMode() {
    isManageMode = !isManageMode;
    if (isManageMode) {
        manageToggleBtn.style.display = "none";
        doneToggleBtn.style.display = "inline-block";
        if (screenHeading) screenHeading.textContent = "Manage Profiles:";
    } else {
        manageToggleBtn.style.display = "inline-block";
        doneToggleBtn.style.display = "none";
        if (screenHeading) screenHeading.textContent = "Who's watching?";
    }
    renderProfiles();
}

if (manageToggleBtn) manageToggleBtn.addEventListener("click", toggleManageMode);
if (doneToggleBtn) doneToggleBtn.addEventListener("click", toggleManageMode);

// Modal Functions
function openEditModal(index) {
    currentEditingIndex = index;
    const profiles = getProfilesList();
    const p = profiles[index];

    if (editNameInput) editNameInput.value = p.name;
    if (modalAvatarImg) modalAvatarImg.src = p.avatar;
    if (isKidsCheckbox) isKidsCheckbox.checked = !!p.isKids;

    if (editModal) editModal.style.display = "flex";
}

function closeEditModal() {
    if (editModal) editModal.style.display = "none";
    currentEditingIndex = null;
}

if (cancelProfileBtn) cancelProfileBtn.addEventListener("click", closeEditModal);

const avatarChoices = document.querySelectorAll(".avatar-choice");
avatarChoices.forEach(choice => {
    choice.addEventListener("click", () => {
        if (modalAvatarImg) modalAvatarImg.src = choice.dataset.src;
    });
});

if (saveProfileBtn) {
    saveProfileBtn.addEventListener("click", () => {
        if (currentEditingIndex === null) return;
        const profiles = getProfilesList();
        
        profiles[currentEditingIndex] = {
            ...profiles[currentEditingIndex],
            name: editNameInput.value.trim() || "Profile",
            avatar: modalAvatarImg.src,
            isKids: isKidsCheckbox.checked
        };

        saveProfilesList(profiles);
        closeEditModal();
        renderProfiles();
    });
}

if (deleteProfileBtn) {
    deleteProfileBtn.addEventListener("click", () => {
        if (currentEditingIndex === null) return;
        let profiles = getProfilesList();
        
        if (profiles.length <= 1) {
            alert("You must keep at least one profile.");
            return;
        }

        profiles = profiles.filter((_, idx) => idx !== currentEditingIndex);
        saveProfilesList(profiles);
        closeEditModal();
        renderProfiles();
    });
}

function addNewProfile() {
    const name = prompt("Enter new profile name:");
    if (!name || !name.trim()) return;

    const profiles = getProfilesList();
    const newProfile = {
        id: Date.now(),
        name: name.trim(),
        avatar: `../assets/images/avatar${(profiles.length % 4) + 1}.jpg`,
        isKids: false
    };

    profiles.push(newProfile);
    saveProfilesList(profiles);
    renderProfiles();
}

document.addEventListener("DOMContentLoaded", () => {
    renderProfiles();
});
