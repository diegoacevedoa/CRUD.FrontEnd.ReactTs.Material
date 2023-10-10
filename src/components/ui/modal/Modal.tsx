import { useMemo } from "react";
import "./Modal.scss";

interface IModal {
  show: boolean;
  head: any;
  body: any;
  foot: any;
  size: string;
  onClose: () => void;
}

const Modal = ({
  show = false,
  head,
  body,
  foot,
  onClose,
  size = "md",
}: IModal) => {
  const showHead = useMemo(() => {
    if (head) {
      return (
        <div className="modal-header">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div className="modal-title">{head}</div>
        </div>
      );
    }
    return null;
  }, [head]);

  const showBody = useMemo(() => {
    if (body) {
      return <div className="modal-body">{body}</div>;
    }
  }, [body]);

  const showFooter = useMemo(() => {
    if (foot) {
      return <div className="modal-footer">{foot}</div>;
    }

    return null;
  }, [foot]);

  const sizeClass = useMemo(() => {
    return `modal-content ${size}`;
  }, [size]);

  if (!show) {
    return null;
  }

  return (
    <div className="mb-modal">
      <div className={sizeClass}>
        {showHead}

        {showBody}

        {showFooter}
      </div>
    </div>
  );
};

export default Modal;
