import { useState } from "react";
import "./App.css";

function App() {
  // Contacts DataBase
  const [contacts, setContacts] = useState(
    localStorage.getItem("contacts")
      ? JSON.parse(localStorage.getItem("contacts"))
      : []
  );
  // Dark mode function

  const [dark, setDark] = useState(
    localStorage.getItem("dark")
      ? JSON.parse(localStorage.getItem("dark"))
      : false
  );

  // o'zgaruvchilar
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  localStorage.setItem("contacts", JSON.stringify(contacts));
  // Write to DataBase
  const writeDB = () => {
    const obj = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      surname: surname,
      phone: phone,
      email: email,
      data: data,
    };
    setContacts([...contacts, obj]);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  // Delete Contact
  const deleteContact = (id) => {
    const newContacts = contacts.filter((contact, index) => {
      return index !== id;
    });
    setContacts(newContacts);
    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  // Edit Contact
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState();
  const editContact = (id) => {
    const newContacts = contacts.filter((contact, index) => {
      return index == id;
    });
    setName(newContacts[0].name);
    setSurname(newContacts[0].surname);
    setPhone(newContacts[0].phone);
    setEmail(newContacts[0].email);
    setData(newContacts[0].data);
  };

  // Search function
  const [copyData, setCopyData] = useState(contacts);
  const search = (text) => {
    const newContacts = copyData.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(text.toLowerCase()) ||
        contact.surname.toLowerCase().includes(text.toLowerCase()) ||
        contact.phone.toLowerCase().includes(text.toLowerCase()) ||
        contact.email.toLowerCase().includes(text.toLowerCase()) ||
        contact.data.toLowerCase().includes(text.toLowerCase())
      );
    });
    setCopyData(newContacts);
  };
  return (
    <div className={dark ? "darkTheme" : "whiteTheme"}>
      <header>
        <nav>
          <div className="container">
            <button className="codes">
              Websayt kodlari{" "}
              <img src={!dark ? "/code.svg" : "/whitecode.svg"} alt="" />
            </button>
            <h2 className="title">Kontaktlar</h2>
            <button
              onClick={() => {
                setDark(!dark);
                localStorage.setItem("dark", !dark);
              }}
              className="dark"
            >
              <img src={!dark ? "/tun.svg" : "/sun.svg"} alt="" />
              Tun rejimi
            </button>
          </div>
        </nav>
      </header>

      <main>
        <div className="container">
          <div className="left-side">
            <h2 className="title">Kontakt yaratish</h2>
            <div className="card">
              <div className="card-img">
                <img src="/user.svg" alt="" />
              </div>
              <div className="card-input">
                <form
                  onSubmit={() => {
                    if (
                      name !== "" &&
                      surname !== "" &&
                      phone !== "" &&
                      email !== "" &&
                      data !== ""
                    ) {
                      if (editing) {
                        contacts.map((contact) => {
                          console.log(contact.id == editingId);

                          if (contact.id == editingId) {
                            contact.name = name;
                            contact.surname = surname;
                            contact.phone = phone;
                            contact.email = email;
                            contact.data = data;
                            setEditing(false);
                          }
                        });
                      } else {
                        writeDB();
                      }
                    } else {
                      alert("Malumotlarni to'liq kiriting");
                    }
                    setName("");
                    setSurname("");
                    setPhone("");
                    setEmail("");
                    setData("");
                  }}
                  action="#"
                >
                  <div className="inputData">
                    <img
                      src={!dark ? "/name.svg" : "/whitename.svg"}
                      className="col"
                      alt=""
                    />
                    <input
                      value={name}
                      onInput={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      id="name"
                      placeholder="Ism"
                    />
                  </div>
                  <div className="inputData">
                    <img
                      src={!dark ? "/familiya.svg" : "/namefam.svg"}
                      className="col"
                      alt=""
                    />
                    <input
                      value={surname}
                      onInput={(e) => {
                        setSurname(e.target.value);
                      }}
                      type="text"
                      id="fam"
                      placeholder="Familiya"
                    />
                  </div>
                  <div className="inputData">
                    <img
                      src={!dark ? "/phone.svg" : "/whitephone.svg"}
                      className="col"
                      alt=""
                    />
                    <input
                      value={phone}
                      onInput={(e) => {
                        setPhone(e.target.value);
                      }}
                      type="text"
                      id="num"
                      placeholder="Telefon raqam"
                    />
                  </div>
                  <div className="inputData">
                    <img
                      src={!dark ? "/pochta.svg" : "/whitemail.svg"}
                      className="col"
                      alt=""
                    />
                    <input
                      value={email}
                      onInput={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="text"
                      id="email"
                      placeholder="Elektron pochta"
                    />
                  </div>
                  <div className="inputData">
                    <img
                      src={!dark ? "/data.svg" : "/whitedata.svg"}
                      className="col"
                      alt=""
                    />
                    <input
                      value={data}
                      onInput={(e) => {
                        setData(e.target.value);
                      }}
                      type="text"
                      id="data"
                      placeholder="Qo'shimcha ma`lumot"
                    />
                  </div>
                  <div className="inputData addBtn">
                    <i className="fa-regular fa-star"></i>
                    <button type="submit" id="addButton">
                      Qo'shish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="right-side">
            <h2 className="title">Kontaktlar</h2>
            <div className="block">
              <div className="block-head">
                <p>Kamoliddin Mirzaboyev</p>
                <img src="/head.svg" alt="" />
              </div>
              <div className="search">
                <i className="fas fa-search col searchBtn"></i>
                <input
                  onInput={(e) => {
                    search(e.target.value);
                  }}
                  type="text"
                  placeholder="Kontakt qidirish"
                />
                <p className="all">Barchasi</p>
              </div>
              <div className="contacts">
                {contacts.map((contact) => {
                  return (
                    <div className="contact">
                      <div className="data">
                        <img src="/users.svg" alt="" />
                        <div className="contact-data">
                          <h2>
                            {contact.name} {contact.surname}
                          </h2>
                          <p>{contact.phone}</p>
                        </div>
                      </div>
                      <div className="btns">
                        <i
                          onClick={() => {
                            deleteContact(contacts.indexOf(contact));
                          }}
                          className="fa-solid fa-trash"
                        ></i>
                        <i className="$ fa-regular fa-star star"></i>
                        <i
                          onClick={() => {
                            setEditing(true);
                            editContact(contacts.indexOf(contact));
                            setEditingId(contact.id);
                          }}
                          className="fa-solid fa-pencil"
                        ></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
