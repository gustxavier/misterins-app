import Swal from "sweetalert2";
import api from "../services/api";
import { simpleNoty } from "./NotyFeedBack";

export function simpleSwal(title, text, type) {
  Swal.fire({
    title: title,
    type: type,
    html: text,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: "OK, entendi!",
  });
}

export function confirmToDelete(props, path, redirect) {
  Swal.fire({
    title: "Você tem certeza?",
    type: "question",
    html: "Ao excluir, este conteúdo não poderá ser recuperado.",
    showCloseButton: false,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Sim, excluir!",
    confirmButtonColor: "#dc3545",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.value) {
      api
        .delete(path, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.status) {
            simpleNoty("Item removido com sucesso!", "success");
          } else {
            simpleNoty(
              "Oops! Não foi possível excluir este item. Entre em contato com o adminsitrador do sistema.",
              "warning"
            );
          }
          props.history.push(redirect);
        })
        .catch((response) => {
          simpleNoty(
            "Oops! Entre em contato com o adminsitrador do sistema.",
            "danger"
          );
        });
    }
  });
}
