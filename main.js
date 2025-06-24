// 当整个 HTML 文档加载并解析完成后，执行括号内的所有代码
document.addEventListener("DOMContentLoaded", () => {
  // --- 初始化所有功能模块 ---
  initPortfolioFilter(); // 初始化作品集筛选功能
  initMobileMenu(); // 初始化移动端汉堡菜单功能
  initFancybox(); // 初始化 Fancybox 图片灯箱

  console.log("所有脚本已成功初始化。");
});

/**
 * 模块一：初始化作品集筛选功能
 * - 绑定筛选按钮的点击事件
 * - 页面加载时执行一次默认筛选
 */
function initPortfolioFilter() {
  const filterContainer = document.getElementById("filter-buttons");
  const portfolioGrid = document.getElementById("portfolio-grid");

  // 卫兵模式：如果页面上没有筛选容器或作品网格，则不执行任何操作
  if (!filterContainer || !portfolioGrid) {
    console.warn(
      "未找到作品集筛选所需的元素 (filter-buttons 或 portfolio-grid)。"
    );
    return;
  }

  const filterButtons = filterContainer.querySelectorAll(".filter-btn");
  const projectCards = portfolioGrid.querySelectorAll(".project-card");

  // 定义筛选作品的函数
  const filterItems = (category) => {
    projectCards.forEach((card) => {
      // 使用三元运算符简化逻辑
      // 如果类别匹配，就移除 'hidden' 类；否则，添加 'hidden' 类。
      const isMatch = card.dataset.category === category;
      card.classList.toggle("hidden", !isMatch);
    });
  };

  // 为筛选按钮容器添加点击事件监听（事件委托）
  filterContainer.addEventListener("click", (e) => {
    const clickedButton = e.target.closest(".filter-btn"); // 使用 closest 确保点到图标也能找到按钮

    // 如果没点到按钮，则什么都不做
    if (!clickedButton) return;

    // 获取要筛选的类别
    const category = clickedButton.dataset.category;

    // 1. 更新按钮的激活状态
    filterButtons.forEach((button) => {
      button.classList.remove("active", "bg-gray-800", "text-white");
      button.classList.add("bg-white", "text-gray-700");
    });
    clickedButton.classList.add("active", "bg-gray-800", "text-white");
    clickedButton.classList.remove("bg-white", "text-gray-700");

    // 2. 执行筛选
    filterItems(category);
  });

  // 页面加载时，执行一次初始筛选
  // 找到默认带有 'active' 类的按钮，并触发一次筛选
  const initialActiveButton =
    filterContainer.querySelector(".filter-btn.active");
  if (initialActiveButton) {
    filterItems(initialActiveButton.dataset.category);
  }
}

/**
 * 模块二：初始化移动端汉堡菜单功能
 * - 切换菜单的显示和隐藏
 * - 点击菜单链接后自动关闭菜单
 */
function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // 卫兵模式：如果页面上没有汉堡菜单按钮或菜单本身，则不执行任何操作
  if (!mobileMenuButton || !mobileMenu) {
    console.warn(
      "未找到移动端菜单所需的元素 (mobile-menu-button 或 mobile-menu)。"
    );
    return;
  }

  const mobileMenuLinks = mobileMenu.querySelectorAll("a");

  // 点击汉堡按钮时，切换菜单的显示/隐藏
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // 点击菜单中的任何链接时，自动关闭菜单（非常好的用户体验）
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

/**
 * 模块三：初始化 Fancybox
 * - 绑定到所有带有 [data-fancybox] 属性的元素
 */
function initFancybox() {
  // 检查 Fancybox 是否已定义，避免库未加载时出错
  if (typeof Fancybox !== "undefined") {
    Fancybox.bind("[data-fancybox]", {
      // 你可以在这里添加自定义配置
    });
  } else {
    console.warn("Fancybox 库未找到。");
  }
}
