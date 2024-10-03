"use client";

import './icon-select.scss';
import * as React from 'react';
import { Button, useField } from '@payloadcms/ui';
import Icons, { IconKeys } from '@/components/ui/icon';

type WidgetSelectProps = {
  field: { name: string };
}

export const IconSelectComponent: React.FC<WidgetSelectProps> = ({ field: { name } }) => {
  const { setValue: setValueHidden } = useField<string>({ path: name });
  const { value, setValue } = useField<string>({ path: name?.substring(1) });

  const _setValue = React.useCallback((value: string) => {
    setValue(value);
    setValueHidden(value);
  }, [setValue, setValueHidden]);

  return (
    <div className="icon-select">
      <label className = "field-label">
        Select an icon
    </label>
    <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
    {IconKeys.map((iconKey) => {
      const IconComp = Icons[iconKey];
      return (<Button buttonStyle={value === iconKey ? 'primary' : 'secondary'} icon={<IconComp />} onClick={() => _setValue(iconKey)}></Button>);
    })}
    </div>
  </div>
)
}

export const IconUIComponent: React.FC<WidgetSelectProps> = ({ field: { name } }) => {
  const { value } = useField<string>({ path: name?.substring(1) });

  return value;
}