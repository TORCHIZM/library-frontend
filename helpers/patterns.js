const patterns = {
  string: /^[A-Za-z0-9._ıİöÖüÜşŞçÇğĞ]+$/,
  stringWithSpace: /^[A-Za-z0-9._ıİöÖüÜşŞçÇğĞ ]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  platform: /web|ios|android/,
};

export default patterns;
