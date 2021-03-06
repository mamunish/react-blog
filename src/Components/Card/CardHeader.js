import React from "react";

/* ---------------- nodejs library that concatenates classes ---------------- */
import classNames from "classnames";

 /* ------------- nodejs library to set properties for components ------------ */
import PropTypes from "prop-types";

 /* ---------------------- @material-ui/core components ---------------------- */
import { makeStyles } from "@material-ui/styles";

 /* ----------------------------- core components ---------------------------- */
import styles from "../../Assets/js/components/cardHeaderStyle.js";

const useStyles = makeStyles(styles);

/* -------------------------------------------------------------------------- */
/*                            card header component                           */
/* -------------------------------------------------------------------------- */

export default function CardHeader(props) {
  const classes = useStyles();
  const { className, children, color, plain, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [className]: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(["warning", "success", "danger", "info", "primary"]),
  plain: PropTypes.bool,
  children: PropTypes.node,
};
