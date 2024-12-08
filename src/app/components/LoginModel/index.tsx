'use client';

import IconAt from '../icon/icon-at';
import IconLock from '../icon/icon-lock';
import IconUser from '../icon/icon-user';
import IconX from '../icon/icon-x';

import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

interface Iprops {
  open: boolean;
  close: () => void;
}

export const LoginModel = ({ open, close }: Iprops) => {
  const [isOpenRegister, setOpenRegister] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <div>
        <Transition appear show={open} as={Fragment}>
          <Dialog as="div" open={open} onClose={close}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0" />
            </Transition.Child>
            <div
              id="login_modal"
              className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60"
            >
              <div className="flex min-h-screen items-start justify-center px-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 px-4 py-1 text-black dark:text-white-dark">
                    <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                      <h5>{isOpenRegister ? 'Registrar' : 'Login'}</h5>
                      <button
                        type="button"
                        onClick={close}
                        className="text-white-dark hover:text-dark"
                      >
                        <IconX />
                      </button>
                    </div>

                    <div className="p-5">
                      <form>
                        {isOpenRegister && (
                          <div className="relative mb-4">
                            <span className="absolute top-1/2 -translate-y-1/2 left-3 dark:text-white-dark ltr:left-3 rtl:right-3 ">
                              <IconUser className="h-5 w-5" />
                            </span>
                            <input
                              type="text"
                              placeholder="Nome"
                              className="form-input ltr:pl-10 rtl:pr-10 pl-10 font-medium"
                              id="login_email"
                            />
                          </div>
                        )}

                        <div className="relative mb-4">
                          <span className="absolute top-1/2 -translate-y-1/2 left-3 dark:text-white-dark ltr:left-3 rtl:right-3 ">
                            <IconAt className="h-5 w-5" />
                          </span>
                          <input
                            type="email"
                            placeholder="E-mail"
                            className="form-input ltr:pl-10 rtl:pr-10 pl-10 font-medium"
                            id="login_email"
                          />
                        </div>

                        <div className="relative mb-4">
                          <span className="absolute top-1/2 -translate-y-1/2 left-3 dark:text-white-dark ltr:left-3 rtl:right-3">
                            <IconLock className="h-5 w-5" />
                          </span>
                          <input
                            type="password"
                            placeholder="Senha"
                            className="form-input ltr:pl-10 rtl:pr-10 pl-10 font"
                            id="login_password"
                          />
                        </div>

                        {isOpenRegister && (
                          <div className="relative mb-4">
                            <span className="absolute top-1/2 -translate-y-1/2 left-3 dark:text-white-dark ltr:left-3 rtl:right-3">
                              <IconLock className="h-5 w-5" />
                            </span>
                            <input
                              type="password"
                              placeholder="Confirme sua senha"
                              className="form-input ltr:pl-10 rtl:pr-10 pl-10 font"
                              id="login_password"
                            />
                          </div>
                        )}

                        <button
                          type="button"
                          className="btn btn-primary w-full"
                        >
                          Entrar
                        </button>
                      </form>
                    </div>

                    <div className="border-t border-[#ebe9f1] p-5 dark:border-white/10">
                      <p className="text-center text-sm text-white-dark dark:text-white-dark/70">
                        {isOpenRegister
                          ? 'Já possui uma conta?'
                          : 'Novo por aqui?'}
                        <button
                          type="button"
                          className="text-[#515365] ml-1 hover:underline dark:text-white-dark ltr:ml-1 rtl:mr-1"
                          onClick={() => setOpenRegister(!isOpenRegister)}
                        >
                          {isOpenRegister ? 'Faça login' : 'Cadastre-se'}
                        </button>
                      </p>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};
