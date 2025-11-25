import { useTranslation } from "react-i18next";

function PageHeader({ currentPage = "home", handleReload, previous = false }) {
  const { t } = useTranslation("home");

  return (
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
