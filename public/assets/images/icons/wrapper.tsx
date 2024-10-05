function withIconStyles(WrappedIcon: React.ComponentType<any>) {
  const StyledIcon = (props: React.ComponentProps<any>) => (
    <WrappedIcon width="1.5em" height="1.5em" {...props} />
  );

  StyledIcon.displayName = `WithStyles(${getDisplayName(WrappedIcon)})`;
  return StyledIcon;
}

function getDisplayName(WrappedComponent: React.ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withIconStyles;
