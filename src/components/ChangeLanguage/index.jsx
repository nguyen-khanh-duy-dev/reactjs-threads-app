import i18n, { locales } from "@/i18n/i18n";

function ChangeLanguage() {
  const currentLng = locales[i18n.language];
  console.log(currentLng);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("vi")}>Tiếng việt</button>
    </>
  );
}
export default ChangeLanguage;
