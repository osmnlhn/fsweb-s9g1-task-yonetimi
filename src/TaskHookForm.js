import { nanoid } from "nanoid";
import React from "react";
import { useForm } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";

export default function TaskHookForm({ kisiler, submitFn }) {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
    mode: "all",

  })


 

  const taskSubmit =(data) => {
    submitFn({...data, id:nanoid(5), status:"Done"});
    console.log(data);
    data.reset();
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(taskSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", {
            required: { value: true, message: "Isim giriniz" },
            minLength: { value: 3, message: "En az 3 karakter giriniz" }

          })

          }
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>
   
      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          placeholder="React Hook Form"
          {...register("description", {
            required: { value: true, message: "Aciklama giriniz" },
            minLength: { value: 10, message: "En az 10 karakter giriniz" }
          })} ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  validate: (value) => value.length > 0
                    ? value.length <= 3 || "En fazla 3 kisi secebilirsiniz"
                    : "En az 1 kisi seciniz",
                })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people.message}</p>
        )}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>

      </div>

      <div style={{display:"flex", justifyContent:"center"}}>
      <input
        style={{marginTop: 20 , textAlign:"center"  }}
        type="button"
        onClick={() =>
          reset({
            title: "",
            description: "",
            people: [],
          })
        }
        value="Reset with values"
      />
      </div>
    </form>
  );
}