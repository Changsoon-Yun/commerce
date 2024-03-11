import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore/lite';
import { db } from '@/lib/firebase/firebase.ts';
import { User } from '@/types/user.ts';
import { z } from 'zod';
import { productFormSchema } from '@/lib/zod/schemas.ts';
import { OrderStatus, Product } from '@/types/product.ts';

interface UploadData {
  values: z.infer<typeof productFormSchema>;
  imageUrlList: string[];
}

interface IdProps {
  id: string;
}

interface SubmitActionProps extends UploadData {
  userData: User;
}

interface EditActionProps extends UploadData, IdProps {}

interface DeleteActionProps extends IdProps {}

interface UpdateOrderStatusActionProps extends IdProps {
  value: string;
  product: Product;
}

interface CancelOrderByIdActionProps extends IdProps {}

interface UpdateFetchActionProps extends IdProps {
  idx: number;
  isSold: boolean;
  checkItems: Product[];
  storedUserData: User;
}

const submitAction = async ({ userData, values, imageUrlList }: SubmitActionProps) => {
  const collectionRef = collection(db, `products`);
  const docRef = await addDoc(collectionRef, {
    uid: userData?.uid,
    sellerEmail: userData?.email,
    title: values.title,
    desc: values.desc,
    price: +values.price,
    category: values.category,
    condition: values.condition,
    imageList: imageUrlList,
    isSold: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const productRef = doc(db, `products/${docRef.id}`);
  await updateDoc(productRef, {
    id: docRef.id,
  });
};

const editAction = async ({ values, imageUrlList, id }: EditActionProps) => {
  const productRef = doc(db, `products/${id}`);
  const productSnapshot = await getDoc(productRef);
  const product = productSnapshot.data();
  if (product) {
    await updateDoc(productRef, {
      ...product,
      title: values.title,
      desc: values.desc,
      price: +values.price,
      category: values.category,
      condition: values.condition,
      imageList: [...product.imageList, ...imageUrlList],
      updatedAt: serverTimestamp(),
    });
  }
};

const deleteAction = async ({ id }: DeleteActionProps) => {
  const productRef = doc(db, `products/${id}`);
  await deleteDoc(productRef);
};

const updateOrderStatusAction = async ({ value, id, product }: UpdateOrderStatusActionProps) => {
  const productRef = doc(db, `products/${id}`);
  await updateDoc(productRef, {
    ...product,
    updatedAt: serverTimestamp(),
    orderStatus: value,
  });
};

const cancelOrderByIdAction = async ({ id }: CancelOrderByIdActionProps) => {
  const productRef = doc(db, `products/${id}`);
  const productSnapshot = await getDoc(productRef);
  const productData = productSnapshot.data() as Product;
  await updateDoc(productRef, {
    ...productData,
    orderStatus: OrderStatus.ORDER_CANCELLED,
    customerData: null,
    orderedDate: null,
    isSold: false,
    updatedAt: serverTimestamp(),
  });
};

const updateFetchAction = async ({
  id,
  idx,
  isSold,
  checkItems,
  storedUserData,
}: UpdateFetchActionProps) => {
  const productRef = doc(db, `products/${id}`);
  const productSnapshot = await getDoc(productRef);
  const productData = productSnapshot.data() as Product;

  const sellerRef = doc(db, `users/${productData.uid}`);
  const sellerSnapshot = await getDoc(sellerRef);
  const sellerData = sellerSnapshot.data() as User;

  const itemToUpdate = checkItems[idx];
  const newData = {
    ...itemToUpdate,
    isSold: isSold,
    customerData: isSold ? storedUserData : null,
    orderedDate: serverTimestamp(),
    updatedAt: serverTimestamp(),
    sellerEmail: sellerData.email,
    orderStatus: isSold ? OrderStatus.AWAITING_SHIPMENT : null,
  };
  await updateDoc(productRef, newData);
};

export {
  submitAction,
  editAction,
  deleteAction,
  updateOrderStatusAction,
  cancelOrderByIdAction,
  updateFetchAction,
};
