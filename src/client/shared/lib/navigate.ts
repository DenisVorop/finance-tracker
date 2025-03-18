export function navigate({
  href,
  target = '_self',
  preserveSearch = false,
}: {
  href: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  /** Оставить текущие параметры в href */
  preserveSearch?: boolean;
}): void {
  const _href = {
    raw: href,
    mod: href,
  };

  if (preserveSearch && window.location.search) {
    const currentParams = new URLSearchParams(window.location.search);
    const hrefParams = new URLSearchParams(_href.raw.split('?')[1]);

    hrefParams.forEach((value, key) => {
      currentParams.set(key, value);
    });

    const baseUrl = _href.raw.split('?')[0];
    _href.mod = `${baseUrl}?${currentParams.toString()}`;
  }

  const a = document.createElement('a');
  a.href = _href.mod;
  a.target = target;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
