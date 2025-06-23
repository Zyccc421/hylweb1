document.addEventListener("DOMContentLoaded", () => {
  const filterContainer = document.getElementById("filter-buttons");
  const portfolioGrid = document.getElementById("portfolio-grid");

  // 定义一个函数，用于执行初始的筛选（页面加载时默认显示第一类的作品）
  const performInitialFilter = () => {
    const initialActiveButton =
      filterContainer.querySelector(".filter-btn.active");
    if (initialActiveButton) {
      const initialCategory = initialActiveButton.dataset.category;
      const allCards = portfolioGrid.querySelectorAll(".project-card");

      allCards.forEach((card) => {
        // 新逻辑：如果类别不匹配，就添加 'hidden' 类，否则移除 'hidden' 类
        if (card.dataset.category !== initialCategory) {
          card.classList.add("hidden");
        } else {
          card.classList.remove("hidden");
        }
      });
    }
  };

  // 为筛选按钮容器添加点击事件监听
  if (filterContainer) {
    filterContainer.addEventListener("click", (e) => {
      // 确保点击的是筛选按钮
      if (!e.target.matches(".filter-btn")) return;

      const clickedButton = e.target;
      const category = clickedButton.dataset.category;
      const projectCards = portfolioGrid.querySelectorAll(".project-card");

      // 移除旧的激活按钮样式
      const activeButton = filterContainer.querySelector(".active");
      if (activeButton) {
        activeButton.classList.remove("active", "bg-gray-800", "text-white");
        activeButton.classList.add("bg-white", "text-gray-700");
      }
      // 为被点击的按钮添加激活样式
      clickedButton.classList.add("active", "bg-gray-800", "text-white");
      clickedButton.classList.remove("bg-white", "text-gray-700");

      // 根据选择的分类显示或隐藏作品卡片
      projectCards.forEach((card) => {
        // 新逻辑：如果类别不匹配，就添加 'hidden' 类，否则移除 'hidden' 类
        if (card.dataset.category !== category) {
          card.classList.add("hidden");
        } else {
          card.classList.remove("hidden");
        }
      });
    });
  }

  // --- 下面的逻辑是为 hyl084.html 设计的，保留它没有坏处 ---
  // 这段代码的目的是让某些卡片内容区默认展开，并移除它们的展开/折叠按钮

  // --- 初始化操作 ---

  performInitialFilter(); // 执行初始筛选
  Fancybox.bind("[data-fancybox]", {}); // 初始化图片灯箱效果
});

document.addEventListener("DOMContentLoaded", () => {
  // ... 你现有的 filter 和 fancybox 的代码保留不动 ...
  const filterContainer = document.getElementById("filter-buttons");
  const portfolioGrid = document.getElementById("portfolio-grid");

  const performInitialFilter = () => {
    // ... (这部分代码保持原样) ...
  };

  if (filterContainer) {
    // ... (这部分代码保持原样) ...
  }

  performInitialFilter();
  Fancybox.bind("[data-fancybox]", {});

  // --- 以下是新增的汉堡菜单逻辑 ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuLinks = mobileMenu.querySelectorAll("a"); // 获取菜单里的所有链接

  // 当点击汉堡按钮时
  mobileMenuButton.addEventListener("click", () => {
    // 切换 mobile-menu 元素的 "hidden" 类
    mobileMenu.classList.toggle("hidden");
  });

  // (可选，但强烈推荐) 当点击移动菜单中的任何一个链接时，自动关闭菜单
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
});
