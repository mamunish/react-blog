import React from "react";

/* ---------------- nodejs library that concatenates classes ---------------- */
import classNames from "classnames";

 /* ------------- nodejs library to set properties for components ------------ */
import PropTypes from "prop-types";

 /* ---------------------- @material-ui/core components ---------------------- */
import { makeStyles } from "@material-ui/styles";

 /* ----------------------------- core components ---------------------------- */
import styles from "../../Assets/js/components/cardBodyStyle.js";

const useStyles = makeStyles(styles);

/* -------------------------------------------------------------------------- */
/*                             card body component                            */
/* -------------------------------------------------------------------------- */

export default function CardBody(props) {
  const classes = useStyles();
  const { className, children, ...rest } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [className]: className !== undefined,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
