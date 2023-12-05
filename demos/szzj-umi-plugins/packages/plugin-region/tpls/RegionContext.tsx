import { createContext, useContext, useState } from 'react';
import { regionInfo } from '@@/plugin-szregion/regionExports';
import { DEPLOY_REGION } from '@@/plugin-szregion';
import lodashGet from 'lodash/get';

// @ts-ignore
const RegionContext = createContext<{
  locale: string;
  setLocale: React.Dispatch<React.SetStateAction<string>>;
}>();

export function Provider(props: {
  value: string;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState(DEPLOY_REGION!);

  return (
    <RegionContext.Provider value={{
      locale, setLocale,
    }}>
      {props.children}
    </RegionContext.Provider>
  );
}

export function useRegions() {
  const { locale, setLocale } = useContext<{
    locale: string;
    setLocale: React.Dispatch<React.SetStateAction<string>>;
  }>(RegionContext);

  const currentRegionInfo = regionInfo?.[locale]?.messages;

  const getMessage = (namePath: string) => {
    return lodashGet(currentRegionInfo, namePath)
  }

  return {
    regionInfo: regionInfo,
    locale,
    setLocale,
    getMessage,
    currentRegionInfo
  }
}