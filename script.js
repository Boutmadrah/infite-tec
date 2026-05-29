function updateBuilder() {
  const parts = ['cpu','gpu','ram','storage','case','psu'];
  let total = 0;
  let anySelected = false;
  const summaryItems = [];

  parts.forEach(p => {
    const sel = document.getElementById(p+'-select');
    const priceEl = document.getElementById(p+'-price');
    const brandEl = document.getElementById(p+'-brand');
    const val = parseInt(sel.value);
    const selectedOpt = sel.options[sel.selectedIndex];
    const name = selectedOpt.getAttribute('data-name') || '—';
    const isSelected = name !== '—';

    if (isSelected) {
      if (!isNaN(val) && val > 0) {
        total += val;
      }
      anySelected = true;
      priceEl.textContent = (isNaN(val) ? 0 : val).toLocaleString('ar-EG') + ' جنيه';
      priceEl.style.color = '#3b82f6';
      brandEl.textContent = name;
      summaryItems.push({ cat: p, name, price: isNaN(val) ? 0 : val });
    } else {
      priceEl.textContent = '—';
      priceEl.style.color = 'var(--text-muted)';
      brandEl.textContent = 'لم يُختر بعد';
    }
  });

  document.getElementById('builder-total-price').textContent =
    total > 0 ? total.toLocaleString('ar-EG') + ' جنيه' : '0 جنيه';

  const summaryBox = document.getElementById('builder-summary');
  const summaryList = document.getElementById('builder-summary-list');
  if (anySelected) {
    summaryBox.style.display = 'block';
    summaryList.innerHTML = summaryItems.map(i =>
      `<span class="summary-tag">${i.name.split('—')[0].trim()}: ${i.price.toLocaleString('ar-EG')} جنيه</span>`
    ).join('');
  } else {
    summaryBox.style.display = 'none';
  }
}

function orderBuild() {
  const parts = [
    { id: 'cpu', label: 'CPU' },
    { id: 'gpu', label: 'GPU' },
    { id: 'ram', label: 'RAM' },
    { id: 'storage', label: 'Storage' },
    { id: 'case', label: 'Case' },
    { id: 'psu', label: 'PSU' },
  ];
  let lines = [];
  let total = 0;
  parts.forEach(p => {
    const sel = document.getElementById(p.id+'-select');
    const selectedOpt = sel.options[sel.selectedIndex];
    const name = selectedOpt.getAttribute('data-name') || '—';
    const val = parseInt(sel.value);
    const isSelected = name !== '—';
    if (isSelected) {
      lines.push(`${p.label}: ${name} — ${isNaN(val) ? 0 : val.toLocaleString()} EGP`);
      if (!isNaN(val) && val > 0) {
        total += val;
      }
    }
  });
  if (lines.length === 0) {
    showToast('❌ اختار قطعة واحدة على الأقل أولاً!');
    return;
  }
  const msg = encodeURIComponent(
    `مرحبا، عايز أطلب تجميعة PC:\n\n${lines.join('\n')}\n\nالإجمالي: ${total.toLocaleString()} جنيه`
  );
  window.open(`https://wa.me/201146083368?text=${msg}`, '_blank');
}

const sigmaOffers = [
  {
    id:'s1', tier:'entry', tierLabel:'⚡ مبتدئ',
    name:'PANDA 5600GT — تجميعة الأساسية',
    img:'https://sigma-computer.com/api/items/file?filename=SIGMA_BUNDLE_PANDA_5600GT.webp',
    icon:'🐼',
    specs:['AMD Ryzen 5 5600GT — 6C / 4.6GHz','Vega 7 iGPU مدمج','8GB DDR4 3200MHz','256GB NVMe','Xigmatek Sky II + 600W PSU'],
    price: 16999, oldPrice: null,
    link:'https://sigma-computer.com/en'
  },
  {
    id:'s2', tier:'entry', tierLabel:'⚡ مبتدئ',
    name:'Dragon 12100F + RTX 3050 6GB',
    img:'https://sigma-computer.com/api/items/file?filename=SIGMA_BUNDLE_DRAGON_12100F.webp',
    icon:'🐉',
    specs:['Intel Core i3-12100F — 4C / 4.3GHz','ZOTAC RTX 3050 6GB GDDR6','8GB DDR4 3200MHz','256GB NVMe','Xigmatek Sky II + 450W PSU'],
    price: 20999, oldPrice: null,
    link:'https://sigma-computer.com/en'
  },
  {
    id:'s3', tier:'entry', tierLabel:'⚡ مبتدئ',
    name:'Fighter R5 7500F + RX 9060 XT 8GB',
    img:'https://sigma-computer.com/api/items/file?filename=SIGMA_BUNDLE_FIGHTER_7500F.webp',
    icon:'⚔️',
    specs:['AMD Ryzen 5 7500F — 6C / 5.0GHz (AM5)','XFX RX 9060 XT 8GB GDDR6 (RDNA 4)','16GB DDR5 6000MHz','500GB NVMe','B650E + AeroCool D501A + 750W Bronze'],
    price: 48500, oldPrice: null,
    link:'https://sigma-computer.com/en'
  },
  {
    id:'s4', tier:'mid', tierLabel:'🎮 متوسط',
    name:'JINX R7 8700F + RX 9060 XT 16GB',
    img:'https://sigma-computer.com/api/items/file?filename=SIGMA_BUNDLE_JINX_8700F.webp',
    icon:'🎮',
    specs:['AMD Ryzen 7 8700F — 8C / 5.0GHz','XFX RX 9060 XT OC 16GB GDDR6 (RDNA 4)','32GB DDR5 7600MHz','500GB NVMe','MSI B650M + APNX AP1-V White + 750W Bronze'],
    price: 55000, oldPrice: null,
    link:'https://sigma-computer.com/en'
  },
  {
    id:'s5', tier:'mid', tierLabel:'🎮 متوسط',
    name:'Powered by Gigabyte — Ultra 5 245K + RTX 5060 Ti',
    img:'https://sigma-computer.com/api/items/file?filename=SIGMA_BUNDLE_GB_5060TI.webp',
    icon:'💻',
    specs:['Intel Core Ultra 5 245K — 14C / 5.2GHz','Gigabyte RTX 5060 Ti Eagle OC 8GB GDDR7 (Blackwell)','32GB Corsair DDR5 6000MHz','1TB NVMe','B860M Gaming + 650W Bronze + 360mm AIO'],
    price: 59999, oldPrice: 65000,
    link:'https://sigma-computer.com/en'
  },
  {
    id:'s6', tier:'mid', tierLabel:'🎮 متوسط',
    name:'Powered by MSI Ultimate — Ultra 7 265KF + RTX 5070',
    img:'https://sigma-computer.com/api/items/file?filename=SIGMA_BUNDLE_MSI_5070.webp',
    icon:'🖥️',
    specs:['Intel Core Ultra 7 265KF — 20C / 5.5GHz','MSI RTX 5070 12GB GDDR7 (Blackwell)','32GB TeamGroup DDR5 6000MHz','1TB MSI Spatium M460 NVMe','MAG Z890 + 750W + MPG 360mm AIO'],
    price: 89999, oldPrice: null,
    link:'https://sigma-computer.com/en'
  },
  {
    id:'s7', tier:'high', tierLabel:'🚀 عالي الأداء',
    name:'Powered by Gigabyte — Ultra 5 245K + RTX 5070 Eagle OC',
    img:'https://sigma-computer.com/api/items/file?filename=SIGMA_BUNDLE_GB_5070.webp',
    icon:'🚀',
    specs:['Intel Core Ultra 5 245K — 14C / 5.2GHz','Gigabyte RTX 5070 Eagle OC 12GB GDDR7 (Blackwell)','Lexar THOR DDR5 16GB×2 6000MHz','Lexar NM610Pro 500GB NVMe','Z890 Elite WiFi7 + APNX V2 + 750W Gold + 360mm ARGB AIO'],
    price: 99999, oldPrice: 110000,
    link:'https://sigma-computer.com/en'
  },
  {
    id:'s8', tier:'high', tierLabel:'🚀 عالي الأداء',
    name:'Ryzen 7 7800X3D + RTX 5070 Ti',
    img:'https://sigma-computer.com/api/items/file?filename=SIGMA_BUNDLE_7800X3D_5070TI.webp',
    icon:'⚡',
    specs:['AMD Ryzen 7 7800X3D — 8C / 5.0GHz (3D V-Cache)','RTX 5070 Ti 16GB GDDR7 (Blackwell)','32GB DDR5 6400MHz','1TB NVMe','MSI B850M + Antec CX700 + MSI A13 Cooler'],
    price: 110000, oldPrice: 120000,
    link:'https://sigma-computer.com/en'
  },
  {
    id:'s9', tier:'ultra', tierLabel:'👑 الترا',
    name:'ROG Ultimate — Ryzen 9 9950X3D + RTX 5090 Dhahab',
    img:'https://sigma-computer.com/api/items/file?filename=SIGMA_BUNDLE_ROG_9950X3D_5090.webp',
    icon:'👑',
    specs:['AMD Ryzen 9 9950X3D — 16C / 5.7GHz (Zen 5 3D V-Cache)','ASUS ROG RTX 5090 Dhahab 32GB GDDR7 (Blackwell)','96GB DDR5 RGB','PCIe Gen5 SSD','ROG X870E HERO + ROG 1200W PSU + LC III 360 AIO + Hyperion GR701'],
    price: 350000, oldPrice: null,
    link:'https://sigma-computer.com/en'
  },
];

let sigmaCurrentFilter = 'all';

function renderSigmaOffers(filter) {
  const grid = document.getElementById('sigmaGrid');
  const filtered = filter === 'all' ? sigmaOffers : sigmaOffers.filter(o => o.tier === filter);
  grid.innerHTML = filtered.map(o => `
    <div class="sigma-card">
      <div class="sigma-card-img-placeholder">${o.icon}</div>
      <div class="sigma-card-body">
        <span class="sigma-card-tier tier-${o.tier}">${o.tierLabel}</span>
        <h4>${o.name}</h4>
        <div class="sigma-specs">
          ${o.specs.map(s => `<div class="sigma-spec">${s}</div>`).join('')}
        </div>
        <div class="sigma-price-row">
          <div>
            ${o.oldPrice ? `<span class="sigma-old-price">${o.oldPrice.toLocaleString('ar-EG')} جنيه</span>` : ''}
            <span class="sigma-price">${o.price.toLocaleString('ar-EG')} جنيه</span>
          </div>
          <button class="sigma-btn" onclick="orderSigma('${o.id}')">💬 اطلب</button>
        </div>
      </div>
    </div>
  `).join('');
}

function sigmaFilter(btn, filter) {
  document.querySelectorAll('#sigma-offers .filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  sigmaCurrentFilter = filter;
  renderSigmaOffers(filter);
}

function orderSigma(id) {
  const offer = sigmaOffers.find(o => o.id === id);
  const msg = encodeURIComponent(
    `مرحبا، عايز أستفسر عن عرض:\n${offer.name}\nالسعر: ${offer.price.toLocaleString()} جنيه\n\nمصدر: Sigma Computer`
  );
  window.open(`https://wa.me/201146083368?text=${msg}`, '_blank');
}

const products = [
  {
    id:1, name:'Beast Gaming — i7 Edition', category:'gaming', icon:'🖥️', badge:'الأكثر مبيعاً',
    specs:[
      'Intel Core i7-14700K — 20 Core / 5.6GHz Boost',
      'NVIDIA GeForce RTX 4070 Ti — 12GB GDDR6X',
      '32GB DDR5-6000 Dual Channel',
      '1TB PCIe 5.0 NVMe SSD',
      'Z790 Motherboard — LGA1700',
      'CPU Cooler 360mm AIO'
    ],
    price:42000, oldPrice:48000
  },
  {
    id:2, name:'Ultra Gaming — i9 Titan', category:'gaming', icon:'🎮', badge:'الأقوى',
    specs:[
      'Intel Core i9-14900K — 24 Core / 6.0GHz Boost',
      'NVIDIA GeForce RTX 4090 — 24GB GDDR6X',
      '64GB DDR5-6400 Quad Channel',
      '2TB PCIe 5.0 NVMe SSD',
      'Z790 Chipset — LGA1700',
      '1000W Gold PSU'
    ],
    price:89000, oldPrice:null
  },
  {
    id:3, name:'Budget Gamer — Ryzen Edition', category:'gaming', icon:'💻', badge:'اقتصادي',
    specs:[
      'AMD Ryzen 5 7600X — 6 Core / 5.3GHz Boost (Zen 4)',
      'NVIDIA GeForce RTX 4060 — 8GB GDDR6',
      '16GB DDR5-5200 Dual Channel',
      '512GB PCIe 4.0 NVMe SSD',
      'B650 Motherboard — AM5',
      '650W Bronze PSU'
    ],
    price:21500, oldPrice:25000
  },
  {
    id:4, name:'Pro Gamer — Ryzen 7 X3D', category:'gaming', icon:'🕹️', badge:'أفضل للجيمنج',
    specs:[
      'AMD Ryzen 7 7800X3D — 8 Core / 5.0GHz (3D V-Cache)',
      'NVIDIA GeForce RTX 4070 Super — 12GB GDDR6X',
      '32GB DDR5-6000 Dual Channel',
      '1TB PCIe 4.0 NVMe SSD',
      'X670E Motherboard — AM5',
      '850W Gold PSU'
    ],
    price:38000, oldPrice:43000
  },
  {
    id:5, name:'Creator Pro X — Ryzen 9', category:'editing', icon:'🎬', badge:'للمونتاج',
    specs:[
      'AMD Ryzen 9 7950X — 16 Core / 5.7GHz Boost (Zen 4)',
      'NVIDIA GeForce RTX 4080 Super — 16GB GDDR6X',
      '64GB DDR5-5600 Quad Channel',
      '2TB + 2TB PCIe 4.0 NVMe (4TB Total)',
      'X670E Motherboard — AM5',
      '1000W Gold PSU'
    ],
    price:72000, oldPrice:null
  },
  {
    id:6, name:'Edit Station — i9 Ultra', category:'editing', icon:'📽️', badge:'4K & 8K',
    specs:[
      'Intel Core i9-14900K — 24 Core / 6.0GHz Boost',
      'NVIDIA GeForce RTX 4080 Super — 16GB GDDR6X',
      '128GB DDR5-5600 Quad Channel',
      '4TB PCIe 5.0 NVMe SSD',
      'Z790 Chipset — LGA1700',
      '1200W Platinum PSU'
    ],
    price:95000, oldPrice:null
  },
  {
    id:7, name:'Office Pro — i5 Edition', category:'office', icon:'💼', badge:'للأعمال',
    specs:[
      'Intel Core i5-14600K — 14 Core / 5.3GHz Boost',
      'NVIDIA GeForce RTX 3060 — 12GB GDDR6',
      '16GB DDR4-3600 Dual Channel',
      '512GB PCIe 4.0 NVMe SSD',
      'B760 Motherboard — LGA1700',
      '650W Bronze PSU'
    ],
    price:17500, oldPrice:20000
  },
  {
    id:8, name:'Business Ultra — Ryzen 5', category:'office', icon:'🏢', badge:'موثوق',
    specs:[
      'AMD Ryzen 5 7600X — 6 Core / 5.3GHz Boost (Zen 4)',
      'AMD Radeon RX 7600 — 8GB GDDR6',
      '32GB DDR5-5200 Dual Channel',
      '1TB PCIe 4.0 NVMe SSD',
      'B650 Motherboard — AM5',
      '650W Gold PSU'
    ],
    price:19000, oldPrice:22000
  },
  {
    id:9, name:'AI Workstation Pro', category:'ai', icon:'🤖', badge:'للـ AI & ML',
    specs:[
      'AMD Ryzen 9 7950X — 16 Core / 5.7GHz Boost (Zen 4)',
      'NVIDIA GeForce RTX 4090 — 24GB GDDR6X',
      '128GB DDR5-5600 ECC Quad Channel',
      '4TB + 4TB PCIe 5.0 NVMe (8TB Total)',
      'X670E Workstation Board — AM5',
      '1200W Platinum PSU'
    ],
    price:145000, oldPrice:null
  },
  {
    id:10, name:'AI Titan — ThreadRipper', category:'ai', icon:'⚡', badge:'Ultra Pro',
    specs:[
      'AMD Ryzen Threadripper 7960X — 24 Core / 5.3GHz (Zen 4)',
      'NVIDIA RTX 4090 x2 — 48GB GDDR6X Total',
      '256GB DDR5 ECC Quad Channel',
      '8TB PCIe 5.0 NVMe RAID',
      'TRX50 Workstation Board',
      '1600W Titanium PSU'
    ],
    price:280000, oldPrice:null
  },
];

let cart = [];
let currentFilter = 'all';

const catMeta = {
  gaming:  { icon:'🎮', label:'جيمنج' },
  editing: { icon:'🎬', label:'مونتاج & إبداع' },
  office:  { icon:'💼', label:'أوفيس & شغل' },
  ai:      { icon:'🤖', label:'AI & برمجة' },
};
function buildCategoryCards() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = Object.entries(catMeta).map(([key, meta]) => {
    const count = products.filter(p => p.category === key).length;
    return `<a href="#" class="cat-card" onclick="filterProducts('${key}');return false;">
      <span class="cat-icon">${meta.icon}</span>
      <h3>${meta.label}</h3>
      <span>${count} تجميعات</span>
    </a>`;
  }).join('');
}
buildCategoryCards();
renderProducts('all');

function renderProducts(filter) {
  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">
      <div style="font-size:48px;margin-bottom:16px;">🔍</div>
      <p>مفيش تجميعات في هذا القسم حالياً</p>
    </div>`;
    return;
  }
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img">
        ${p.icon}
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="product-specs">
          ${p.specs.map(s => `<span class="spec-tag">${s}</span>`).join('')}
        </div>
        <div class="product-footer">
          <div class="product-price">
            ${p.price.toLocaleString('ar-EG')} <small>جنيه</small>
            ${p.oldPrice ? `<br><small style="text-decoration:line-through;color:#ef4444;">${p.oldPrice.toLocaleString('ar-EG')}</small>` : ''}
          </div>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">+ أضف للسلة</button>
        </div>
      </div>
    </div>
  `).join('');
}

function setFilter(btn, filter) {
  document.querySelectorAll('#products .filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = filter;
  renderProducts(filter);
}

function filterProducts(cat) {
  currentFilter = cat;
  document.getElementById('products').scrollIntoView({behavior:'smooth'});
  setTimeout(() => {
    document.querySelectorAll('#products .filter-tab').forEach(b => b.classList.remove('active'));
    renderProducts(cat);
  }, 400);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({...product, qty: 1});
  }
  updateCart();
  showToast(`✅ تم إضافة "${product.name}" للسلة`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((s,i) => s + i.qty, 0);
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = total.toLocaleString('ar-EG') + ' جنيه';
  const cartItems = document.getElementById('cartItems');
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart"><div>🛒</div><p>السلة فاضية<br><small>اضف تجميعات من المتجر</small></p></div>';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-icon">${item.icon}</div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-price">${(item.price * item.qty).toLocaleString('ar-EG')} جنيه</div>
          <small style="color:var(--text-muted)">الكمية: ${item.qty}</small>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    `).join('');
  }
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function checkout() {
  if (cart.length === 0) { showToast('❌ السلة فاضية!'); return; }
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const items = cart.map(i => `${i.name} x${i.qty}`).join(', ');
  const msg = encodeURIComponent(`مرحبا، عايز أطلب:\n${items}\nالإجمالي: ${total.toLocaleString('ar-EG')} جنيه`);
  window.open(`https://wa.me/201146083368?text=${msg}`, '_blank');
}

renderSigmaOffers('all');
