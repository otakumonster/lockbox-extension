/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Localized } from "fluent-react";
import PropTypes from "prop-types";
import React from "react";

import Stack from "./stack";

import styles from "./input.css";

export default class PasswordInput extends React.Component {
  static get propTypes() {
    return {
      className: PropTypes.string,
      monospace: PropTypes.bool,
      disabled: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      className: "",
      monospace: true,
      disabled: false,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
    };
  }

  showPassword(show) {
    this.setState({showPassword: show});
  }

  focus() {
    this.inputElement.focus();
  }

  render() {
    const {className, monospace, disabled, ...props} = this.props;
    const {showPassword} = this.state;
    const disabledClass = disabled ? ` ${styles.disabled}` : "";
    const finalClassName = (
      `${styles.password} ${styles.inputWrapper}${disabledClass} ${className}`
    ).trimRight();
    const selectedIndex = showPassword ? 1 : 0;

    return (
      <div className={finalClassName}>
        <input className={monospace ? styles.monospace : ""} disabled={disabled}
               type={showPassword ? "text" : "password"}
               ref={(element) => this.inputElement = element} {...props}/>
        <Stack stretch selectedIndex={selectedIndex}>
          <Localized id="password-input-show">
            <button className={styles.showBtn} type="button" title="sHOw" disabled={disabled}
                    onClick={() => this.showPassword(true)}></button>
          </Localized>
          <Localized id="password-input-hide">
            <button className={styles.hideBtn} type="button" title="hIDe" disabled={disabled}
                    onClick={() => this.showPassword(false)}></button>
          </Localized>
        </Stack>
      </div>
    );
  }
}
