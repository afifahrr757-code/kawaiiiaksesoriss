// Data Katalog Produk Aksesoris Lucu & Unik
const products = [
    {
        id: 1,
        name: "Fluffy Bear Plush Keychain",
        category: "keychain",
        categoryLabel: "Gantungan Kunci",
        price: 25000,
        emoji: "🧸",
        bgColor: "#fff0db",
        badge: "Best Seller",
        desc: "Gantungan kunci boneka beruang mini super lembut dengan pita pastel."
    },
    {
        id: 2,
        name: "Strawberry Cream Hairclip",
        category: "hair",
        categoryLabel: "Jepit Rambut",
        price: 18000,
        emoji: "🍓",
        bgColor: "#ffe4ec",
        badge: "Terlaris",
        desc: "Jepit rambut model krim stroberi handmade dengan kilau glossy."
    },
    {
        id: 3,
        name: "Pastel Daisy Clay Ring",
        category: "jewelry",
        categoryLabel: "Cincin & Kalung",
        price: 15000,
        emoji: "🌼",
        bgColor: "#fef9c3",
        badge: "Handmade",
        desc: "Cincin polymer clay motif bunga daisy ceria, ringan dan nyaman dipakai."
    },
    {
        id: 4,
        name: "Y2K Star & Pearl Phone Strap",
        category: "phone",
        categoryLabel: "Phone Strap",
        price: 28000,
        emoji: "🦋",
        bgColor: "#ede9fe",
        badge: "Viral TikTok",
        desc: "Gantungan HP manik-manik mutiara dan kupu-kupu aesthetic gaya Y2K."
    },
    {
        id: 5,
        name: "Crochet Tulip Keychain",
        category: "keychain",
        categoryLabel: "Gantungan Kunci",
        price: 22000,
        emoji: "🌷",
        bgColor: "#fce7f3",
        badge: "Limited",
        desc: "Gantungan kunci rajutan tangan bentuk bunga tulip pink yang manis."
    },
    {
        id: 6,
        name: "Cloud & Rainbow Claw Clip",
        category: "hair",
        categoryLabel: "Jepit Rambut",
        price: 24000,
        emoji: "🌈",
        bgColor: "#e0f2fe",
        badge: "Baru",
        desc: "Jedai rambut ukuran sedang motif awan pelangi pastel anti patah."
    },
    {
        id: 7,
        name: "Gummy Bear Resin Necklace",
        category: "jewelry",
        categoryLabel: "Cincin & Kalung",
        price: 32000,
        emoji: "🍬",
        bgColor: "#dcfce7",
        badge: "Unik",
        desc: "Kalung rantai titanium anti karat dengan liontin gummy bear transparan."
    },
    {
        id: 8,
        name: "Bunny Ears Beaded Strap",
        category: "phone",
        categoryLabel: "Phone Strap",
        price: 30000,
        emoji: "🐰",
        bgColor: "#ffedd5",
        badge: "Favorit",
        desc: "Strap HP karakter kelinci imut dengan kombinasi manik pastel."
    }
];

// Inisialisasi Akun Demo Default jika belum ada
const defaultUsers = [
    {
        name: "Member Kawaii",
        email: "demo@kawaiicraft.id",
        phone: "081234567890",
        password: "123456"
    }
];

if (!localStorage.getItem('kawaii_users')) {
    localStorage.setItem('kawaii_users', JSON.stringify(defaultUsers));
}

// State Aplikasi
let currentUser = JSON.parse(localStorage.getItem('kawaii_current_user')) || null;
let cart = JSON.parse(localStorage.getItem('kawaii_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('kawaii_wishlist')) || [];
let orders = JSON.parse(localStorage.getItem('kawaii_orders')) || [];
let directBuyItem = null; // Jika klik "Beli Langsung" pada 1 produk
let currentCategory = 'all';
let searchQuery = '';
let sortOrder = 'default';

// Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

// ================= SISTEM LOGIN & AKUN =================
function updateAuthUI() {
    const authArea = document.getElementById('authArea');
    if (currentUser) {
        const initial = currentUser.name.charAt(0).toUpperCase();
        authArea.innerHTML = `
            <div class="user-pill">
                <span class="user-avatar">${initial}</span>
                <span>Hai, ${currentUser.name.split(' ')[0]}</span>
                <button class="logout-mini-btn" onclick="logoutUser()">Keluar</button>
            </div>
        `;
    } else {
        authArea.innerHTML = `
            <button class="btn btn-login-nav" onclick="openAuthModal('login')">
                <i data-lucide="user"></i> <span>Masuk / Daftar</span>
            </button>
        `;
        lucide.createIcons();
    }
    updateOrdersBadge();
}

function openAuthModal(tab = 'login') {
    closeAllModals();
    switchAuthTab(tab);
    document.getElementById('authModal').classList.add('open');
    document.getElementById('overlay').classList.add('active');
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');

    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
    }
}

// Proses Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('kawaii_users')) || [];
    const found = users.find(u => u.email.toLowerCase() === email && u.password === password);

    if (!found) {
        showToast('❌ Email atau password salah!');
        return;
    }

    currentUser = found;
    localStorage.setItem('kawaii_current_user', JSON.stringify(currentUser));
    updateAuthUI();
    closeAllModals();
    showToast(`🎀 Selamat datang kembali, ${currentUser.name}!`);
});

// Proses Daftar Akun
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;

    const users = JSON.parse(localStorage.getItem('kawaii_users')) || [];
    if (users.some(u => u.email.toLowerCase() === email)) {
        showToast('⚠️ Email sudah terdaftar, silakan langsung login!');
        switchAuthTab('login');
        return;
    }

    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('kawaii_users', JSON.stringify(users));

    currentUser = newUser;
    localStorage.setItem('kawaii_current_user', JSON.stringify(currentUser));
    updateAuthUI();
    closeAllModals();
    showToast(`🎉 Akun berhasil dibuat! Selamat berbelanja, ${name}!`);
});

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('kawaii_current_user');
    updateAuthUI();
    showToast('👋 Kamu telah keluar dari akun.');
}

// ================= KATALOG & PRODUK =================
function renderProducts() {
    const grid = document.getElementById('productGrid');
    
    let filtered = products.filter(p => {
        const matchCat = currentCategory === 'all' || p.category === currentCategory;
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    if (sortOrder === 'low-high') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: #6e6a75;">Yah, aksesoris yang kamu cari belum ketemu 🥺 Coba kata kunci lain ya!</p>`;
        return;
    }

    grid.innerHTML = filtered.map(product => {
        const isLiked = wishlist.includes(product.id);
        return `
            <div class="product-card">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <button class="wishlist-toggle ${isLiked ? 'liked' : ''}" onclick="toggleWishlist(${product.id})" title="Simpan ke Wishlist">
                    ♥
                </button>
                <div class="product-thumb" style="background-color: ${product.bgColor}">
                    ${product.emoji}
                </div>
                <div class="product-info">
                    <span class="product-cat">${product.categoryLabel}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    <div class="product-bottom">
                        <span class="product-price">${formatRupiah(product.price)}</span>
                        <div class="card-btn-group">
                            <button class="add-cart-btn" onclick="addToCart(${product.id})" title="Tambah ke Keranjang">+ Keranjang</button>
                            <button class="buy-now-btn" onclick="buyNow(${product.id})">Beli</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ================= KERANJANG & PEMBELIAN =================
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveAndUpdateCart();
    showToast(`✨ "${product.name}" masuk keranjang!`);
}

// Beli Langsung 1 Produk
function buyNow(id) {
    if (!currentUser) {
        showToast('🔐 Silakan masuk (login) dulu untuk membeli produk!');
        openAuthModal('login');
        return;
    }
    const product = products.find(p => p.id === id);
    directBuyItem = [{ ...product, qty: 1 }];
    openCheckoutModal(directBuyItem);
}

// Lanjut Pembelian dari Keranjang
document.getElementById('proceedCheckoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('🛒 Keranjang masih kosong!');
        return;
    }
    if (!currentUser) {
        closeAllModals();
        showToast('🔐 Silakan masuk (login) dulu untuk melanjutkan pembelian!');
        openAuthModal('login');
        return;
    }
    directBuyItem = null;
    openCheckoutModal(cart);
});

function openCheckoutModal(itemsToBuy) {
    closeAllModals();
    const summaryBox = document.getElementById('checkoutSummaryBox');
    const subtotal = itemsToBuy.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const shipping = subtotal >= 100000 ? 0 : 12000;
    const grandTotal = subtotal + shipping;

    summaryBox.innerHTML = `
        ${itemsToBuy.map(item => `
            <div class="summary-line">
                <span>${item.emoji} ${item.name} (${item.qty}x)</span>
                <span>${formatRupiah(item.price * item.qty)}</span>
            </div>
        `).join('')}
        <div class="summary-line">
            <span>Ongkos Kirim ${subtotal >= 100000 ? '(Gratis Ongkir!)' : ''}</span>
            <span>${shipping === 0 ? 'Rp 0' : formatRupiah(shipping)}</span>
        </div>
        <div class="summary-line summary-total">
            <span>Total Pembayaran</span>
            <span>${formatRupiah(grandTotal)}</span>
        </div>
    `;

    // Isi otomatis data user yang login
    if (currentUser) {
        document.getElementById('shipName').value = currentUser.name || '';
        document.getElementById('shipPhone').value = currentUser.phone || '';
    }

    document.getElementById('checkoutModal').classList.add('open');
    document.getElementById('overlay').classList.add('active');
}

// Submit Pembelian
document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const itemsToBuy = directBuyItem || cart;
    const subtotal = itemsToBuy.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const shipping = subtotal >= 100000 ? 0 : 12000;
    const grandTotal = subtotal + shipping;

    const newOrder = {
        orderId: 'KW-' + Math.floor(100000 + Math.random() * 900000),
        userEmail: currentUser.email,
        receiver: document.getElementById('shipName').value,
        phone: document.getElementById('shipPhone').value,
        address: document.getElementById('shipAddress').value,
        payment: document.getElementById('paymentMethod').value,
        items: itemsToBuy,
        total: grandTotal,
        status: 'Diproses Penjual',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    orders.unshift(newOrder);
    localStorage.setItem('kawaii_orders', JSON.stringify(orders));

    // Jika checkout dari keranjang, kosongkan keranjang
    if (!directBuyItem) {
        cart = [];
        saveAndUpdateCart();
    }
    directBuyItem = null;

    updateOrdersBadge();
    closeAllModals();
    showToast(`🎉 Pesanan ${newOrder.orderId} berhasil dibuat!`);
    openOrdersModal();
});

// ================= RIWAYAT PESANAN =================
function getUserOrders() {
    if (!currentUser) return [];
    return orders.filter(o => o.userEmail === currentUser.email);
}

function updateOrdersBadge() {
    document.getElementById('ordersCount').textContent = getUserOrders().length;
}

document.getElementById('ordersBtn').addEventListener('click', () => {
    if (!currentUser) {
        showToast('🔐 Masuk dulu untuk melihat riwayat pesananmu!');
        openAuthModal('login');
        return;
    }
    openOrdersModal();
});

function openOrdersModal() {
    closeAllModals();
    const userOrders = getUserOrders();
    const listEl = document.getElementById('ordersList');
    document.getElementById('ordersSubtitle').textContent = `Menampilkan riwayat pesanan untuk akun ${currentUser.email}`;

    if (userOrders.length === 0) {
        listEl.innerHTML = `<p style="text-align:center; padding: 30px; color: #6e6a75;">Belum ada pesanan nih. Yuk belanja aksesoris favoritmu! 🎀</p>`;
    } else {
        listEl.innerHTML = userOrders.map(order => `
            <div class="order-card">
                <div class="order-card-header">
                    <span class="order-id">${order.orderId} • ${order.date}</span>
                    <span class="order-status">${order.status}</span>
                </div>
                <div class="order-items-text">
                    ${order.items.map(i => `${i.emoji} ${i.name} (${i.qty}x)`).join(', ')}
                </div>
                <div class="order-card-footer">
                    <span>Metode: <strong>${order.payment}</strong></span>
                    <strong style="color: var(--primary);">${formatRupiah(order.total)}</strong>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('ordersModal').classList.add('open');
    document.getElementById('overlay').classList.add('active');
}

// ================= HELPER KERANJANG & WISHLIST =================
function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    saveAndUpdateCart();
}

function saveAndUpdateCart() {
    localStorage.setItem('kawaii_cart', JSON.stringify(cart));
    
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartCount').textContent = totalQty;

    const cartItemsEl = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItemsEl.innerHTML = `<div style="text-align:center; padding: 60px 20px; color: #6e6a75;">
            <div style="font-size: 3rem; margin-bottom: 10px;">🛒</div>
            <p>Keranjangmu masih kosong nih. Yuk pilih aksesoris lucunya!</p>
        </div>`;
        document.getElementById('cartTotal').textContent = 'Rp 0';
        return;
    }

    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-emoji">${item.emoji}</div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${formatRupiah(item.price)}</p>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
            </div>
        </div>
    `).join('');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('cartTotal').textContent = formatRupiah(totalPrice);
}

function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
        showToast('Dihapus dari wishlist');
    } else {
        wishlist.push(id);
        showToast('💖 Disimpan ke wishlist!');
    }
    localStorage.setItem('kawaii_wishlist', JSON.stringify(wishlist));
    document.getElementById('wishlistCount').textContent = wishlist.length;
    renderProducts();
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
}

// Modal & Drawer Controls
function closeAllModals() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('authModal').classList.remove('open');
    document.getElementById('checkoutModal').classList.remove('open');
    document.getElementById('ordersModal').classList.remove('open');
    document.getElementById('customModal').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}

document.getElementById('cartBtn').addEventListener('click', () => {
    closeAllModals();
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('overlay').classList.add('active');
});

document.getElementById('closeCartBtn').addEventListener('click', closeAllModals);
document.getElementById('overlay').addEventListener('click', closeAllModals);

// Filter Kategori, Pencarian & Sort
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderProducts();
    });
});

document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

document.getElementById('sortSelect').addEventListener('change', (e) => {
    sortOrder = e.target.value;
    renderProducts();
});

// Custom Order Modal
function openCustomModal() {
    closeAllModals();
    document.getElementById('customModal').classList.add('open');
    document.getElementById('overlay').classList.add('active');
}

document.getElementById('customForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('custName').value;
    const type = document.getElementById('custType').value;
    const note = document.getElementById('custNote').value;

    const msg = `Halo KawaiiCraft! Saya *${name}* mau request Custom Order:%0A- Jenis: ${type}%0A- Detail: ${note}`;
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
    closeAllModals();
});

// Inisialisasi Awal
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updateAuthUI();
    document.getElementById('wishlistCount').textContent = wishlist.length;
    renderProducts();
    saveAndUpdateCart();
});
