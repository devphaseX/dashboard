import {
  GridColumnMenuContainer,
  GridColumnMenuProps,
  GridFilterMenuItem,
  HideGridColMenuItem,
} from '@mui/x-data-grid';

type CustomColumnMenuProps = Pick<
  GridColumnMenuProps,
  'open' | 'hideMenu' | 'currentColumn'
>;
const CustomColumnMenu = ({
  hideMenu,
  currentColumn,
  open,
}: CustomColumnMenuProps) => {
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
      <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  );
};

export { CustomColumnMenu };
