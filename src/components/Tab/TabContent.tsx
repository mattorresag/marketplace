interface TabContentProps {
  value: string | number;
  expectedValue: string | number;
  children: React.ReactNode;
}

export const TabContent = ({
  value,
  expectedValue,
  children,
}: TabContentProps): JSX.Element | null => {
  if (value !== expectedValue) {
    return null;
  }

  return <div className="w-full max-w-[100%]">{children}</div>;
};
