export function Invoice() {
  return (
    <div className="flex flex-col w-full p-5 rounded-xl shadow-2xl gap-y-8">
      <div className="flex flex-row justify-between items-center">
        <img
          className="h-16 w-64 object-cover"
          src="https://ik.imagekit.io/bersuadiserua22/icons/4eb4cb5a-4ed9-4686-b1b4-7fa27016d153.png?updatedAt=1680816777081"
          alt="logo"
        />
        <div className="flex flex-col gap-y-2">
          <p>Invoice</p>
          <p>Inv/123</p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <p>Diterbitkan oleh Sèrua</p>
        <div className="flex flex-col gap-y-4">
          <p className="font-bold text-black">Untuk</p>
          <div className="grid grid-cols-2">
            <p>Atas Nama</p>
            <p className="text-black font-bold">: X</p>
            <p>Tanggal Reservasi</p>
            <p className="text-black font-bold">: Kamis, 23 Desember 2025</p>
            <p>Nomor Whatsapp</p>
            <p className="text-black font-bold">: 62895385250674</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12"></div>
      <table className="table-fixed">
        <thead>
          <tr className="border-y-2 border-black">
            <th className="py-4 text-left">Item</th>
            <th className="py-4 text-right">Jumlah</th>
            <th className="py-4 text-right">Harga Satuan</th>
            <th className="py-4 text-right">Total Harga</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((i) => (
            <tr key={i} className="border-b border-gray-400">
              <td className="py-4 text-left">
                <div className="flex flex-col gap-y-1">
                  <p className="text-xl font-bold">The Sliding</p>
                  <p className="text-xs">The Sliding Mr. Bones (Next Stop, Pottersville)</p>
                </div>
              </td>
              <td className="py-4 text-right">{i}</td>
              <td className="py-4 text-right">1961</td>
              <td className="py-4 text-right">1961</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col items-end border-b border-gray-400 pb-4">
        <div className="flex flex-col w-1/2">
          <div className="flex flex-row justify-between font-bold text-black">
            <p className="uppercase">Total Harga (8 barang)</p>
            <p>Rp567.000</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 text-xs">
        <p>Invoice ini sah dan diproses oleh komputer</p>
        <p>
          Silakan hubungi <span className="text-serua font-bold">Yang Mulia Serua</span> apabila kamu membutuhkan bantuan.
        </p>
      </div>
    </div>
  )
}