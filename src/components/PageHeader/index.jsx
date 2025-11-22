import { useTranslation } from "react-i18next";

function PageHeader({ currentPage = "home", handleReload, previous = false }) {
  const { t } = useTranslation("home");

  return (
    // 1. Xóa 'sticky', 'top-0', 'w-full', 'max-w-[640px]', 'z-10'
    // 2. 'py-4' và 'justify-center' là đúng.
    <div className="flex w-full justify-center py-4.5">
      <span
        className="cursor-pointer font-semibold text-nowrap capitalize"
        onClick={handleReload}
      >
        {t(`content.${currentPage}`)}
      </span>
    </div>
  );
}

export default PageHeader;
