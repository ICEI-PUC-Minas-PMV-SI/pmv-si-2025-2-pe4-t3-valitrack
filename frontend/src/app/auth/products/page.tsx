"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiOutlineSearch, HiOutlineTrash, HiX, HiPencil, HiOutlineExclamation } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';

const sampleProduct = {
  id: 1, name: 'Coca cola 300ml', sector: 'Mercearia', expiry: '2025-10-10', quantity: 35, price: '4.29', status: 'Ativo',
  internalCode: '84546910', priority: 'Alta', unit: 'ml', costPrice: '2.29', totalValue: '150.15', inPromotion: true, promoQuantity: 35, promoPrice: '3.29'
};

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('ativos');
  const [products, setProducts] = useState([sampleProduct]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenDetailsModal = (product: any) => {

    setModalMode('details');
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deletando produto:", selectedProduct?.id);
    setIsDeleteConfirmOpen(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    // API logic to fetch products based on activeTab will go here
  }, [activeTab]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <header className="bg-[#0b2239] text-white flex justify-between items-center px-8 py-3 shadow-md sticky top-0 z-10">
        <div className="flex items-center">
          <img src="/Logo.svg" alt="Logo ValiWeb" className="h-19 w-auto" />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-sm">Márcia Rodrigues</p>
            <p className="text-xs text-gray-300">Supermercado Pereira Pingo</p>
          </div>
          <FaUserCircle className="h-10 w-10 text-gray-400" />
        </div>
      </header>

      <main className="flex-1 p-8">
        <div className="flex items-center border-b border-gray-300 mb-6">
          <TabButton title="Produtos Ativos" isActive={activeTab === 'ativos'} onClick={() => setActiveTab('ativos')} />
          <TabButton title="Vencidos" isActive={activeTab === 'vencidos'} onClick={() => setActiveTab('vencidos')} />
          <TabButton title="Vendidos" isActive={activeTab === 'vendidos'} onClick={() => setActiveTab('vendidos')} />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <HiOutlineSearch className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Buscar produto..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors font-medium text-sm">
              Filtrar
            </button>
            <button onClick={handleOpenAddModal} className="bg-[#e67e22] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#d35400] transition-colors text-sm">
              + Novo Produto
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <Th>Produto</Th><Th>Setor</Th><Th>Validade</Th><Th>Quantidade</Th><Th>Preço Unitário</Th><Th>Status</Th><Th>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50">
                  <Td>{product.name}</Td>
                  <Td>{product.sector}</Td>
                  <Td isExpired={product.status === 'Vencido'}>{product.expiry.split('-').reverse().join('/')}</Td>
                  <Td>{product.quantity}</Td>
                  <Td>R$ {product.price}</Td>
                  <Td><span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">{product.status}</span></Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenDetailsModal(product)} className="px-3 py-1 border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-200 transition-colors">
                        Detalhes
                      </button>
                      <button className="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition-colors">
                        <HiOutlineTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="bg-[#0b2239] text-white mt-auto py-4 px-8 flex justify-end gap-8 text-sm">
        <Link href="#" className="hover:underline">Sobre nós</Link>
        <Link href="#" className="hover:underline">Suporte</Link>
      </footer>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        mode={modalMode} 
        product={selectedProduct}
        onDeleteClick={handleDeleteClick}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

function ProductModal({ isOpen, onClose, mode, product, onDeleteClick }) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (mode === 'add') {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const title = mode === 'add' ? 'Adicionar Novo Produto' : 'Detalhes';

  const handleEditClick = () => setIsEditing(true);

  const handleCancelEdit = () => {
    if (mode === 'details') {
      setIsEditing(false);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            {mode === 'details' && !isEditing && (
              <>
                <button onClick={handleEditClick} className="text-gray-500 hover:text-blue-600"><HiPencil className="h-5 w-5"/></button>
                <button onClick={onDeleteClick} className="text-gray-500 hover:text-red-600"><HiOutlineTrash className="h-5 w-5"/></button>
              </>
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <HiX className="h-6 w-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6">
            <ProductForm 
              productData={product}
              isEditable={isEditing}
              onCancel={handleCancelEdit}
              onSubmit={(formData) => {
                console.log("Salvando dados:", formData);
                onClose();
              }}
            />
        </div>
      </div>
    </div>
  );
}

function ProductForm({ productData, isEditable, onCancel, onSubmit }) {
  const [isPromo, setIsPromo] = useState(productData?.inPromotion || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InputGroup label="Nome - Produto" name="name" defaultValue={productData?.name} disabled={!isEditable} />
        <div></div>
        <SelectGroup label="Setor" name="sector" defaultValue={productData?.sector} disabled={!isEditable} options={['Mercearia', 'Laticínios', 'Padaria', 'Limpeza']} />
        <InputGroup label="Data de Validade" name="expiry" type="date" defaultValue={productData?.expiry} disabled={!isEditable} />
        <InputGroup label="Código Interno" name="internalCode" defaultValue={productData?.internalCode} disabled={!isEditable} />
        <SelectGroup label="Prioridade" name="priority" defaultValue={productData?.priority} disabled={!isEditable} options={['Baixa', 'Média', 'Alta']} />
        <SelectGroup label="Unidade de Medida" name="unit" defaultValue={productData?.unit} disabled={!isEditable} options={['un', 'kg', 'g', 'l', 'ml']} />
        <InputGroup label="Quantidade" name="quantity" type="number" defaultValue={productData?.quantity} disabled={!isEditable} />
        <InputGroup label="Preço de Custo" name="costPrice" prefix="R$" defaultValue={productData?.costPrice} disabled={!isEditable} />
        <InputGroup label="Preço de Venda" name="price" prefix="R$" defaultValue={productData?.price} disabled={!isEditable} />
        <InputGroup label="Valor total do lote" name="totalValue" prefix="R$" defaultValue={productData?.totalValue} disabled={!isEditable} readOnly/>
        <SelectGroup label="Status" name="status" defaultValue={productData?.status} disabled={!isEditable} options={['Ativo', 'Inativo']} />
      </div>

      <div className="pt-4 border-t mt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isPromo} onChange={(e) => setIsPromo(e.target.checked)} disabled={!isEditable} className="h-4 w-4 rounded"/>
          Produto em promoção
        </label>
        {isPromo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
            <InputGroup label="Quantidade em Promoção" name="promoQuantity" type="number" defaultValue={productData?.promoQuantity} disabled={!isEditable} />
            <InputGroup label="Preço Promocional" name="promoPrice" prefix="R$" defaultValue={productData?.promoPrice} disabled={!isEditable} />
          </div>
        )}
      </div>

      {isEditable && (
        <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
          <button type="button" onClick={onCancel} className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700">
            Cancelar
          </button>
          <button type="submit" className="bg-[#0b2239] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#102d4d]">
            Salvar alterações
          </button>
        </div>
      )}
    </form>
  );
}

const InputGroup = ({ label, name, type = 'text', prefix, disabled, readOnly, defaultValue }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      {prefix && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">{prefix}</span>}
      <input type={type} name={name} id={name} defaultValue={defaultValue} disabled={disabled} readOnly={readOnly}
        className={`w-full py-2 border-none rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50 ${prefix ? 'pl-10' : 'px-3'} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
      />
    </div>
  </div>
);

const SelectGroup = ({ label, name, disabled, defaultValue, options }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <select name={name} id={name} defaultValue={defaultValue} disabled={disabled}
      className={`w-full mt-1 py-2 px-3 border-none rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50 ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
        <div className="mx-auto bg-red-100 rounded-full h-12 w-12 flex items-center justify-center">
          <HiOutlineExclamation className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mt-4">Excluir Produto</h3>
        <p className="text-sm text-gray-500 mt-2">
          Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </div>
  );
}

const TabButton = ({ title, isActive, onClick }) => (
  <button onClick={onClick} className={`px-1 pb-2 text-xl font-semibold transition-colors duration-300 mr-8 ${isActive ? 'border-b-2 border-[#0b2239] text-[#0b2239]' : 'text-gray-400 hover:text-gray-600'}`}>{title}</button>
);
const Th = ({ children }) => (<th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{children}</th>);
const Td = ({ children, isExpired = false }) => (<td className={`px-6 py-4 whitespace-nowrap text-sm ${isExpired ? 'text-red-600 font-semibold' : 'text-gray-700 font-medium'}`}>{children}</td>);