

export default function FormCreateEdit({ service, handleChangeInput, handleSubmit }) {
  
  return (
      <div>
          <form className="max-w-sm mx-auto py-10" onSubmit={handleSubmit}>
              <h1 className="text-3xl py-6"> ---- Create/Edit Service ----</h1>
              <div className="mb-5">
                  <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                      Name
                  </label>
                  <input
                      type="text"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={service.name}
                      onChange={handleChangeInput}
                      name="name"
                  />
              </div>
              <div className="mb-5">
                  <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                      Region
                  </label>
                  <input
                      type="text"
                      id="region"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={service.region}
                      onChange={handleChangeInput}
                      name="region"
                  />
              </div>
              <div className="mb-5">
                  <label
                      htmlFor="imgUrl"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                      imageUrl
                  </label>
                  <input
                      type="text"
                      id="imgUrl"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={service.imageUrl}
                      onChange={handleChangeInput}
                      name="imageUrl"
                  />
              </div>
              <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                  Description
              </label>
              <textarea
                  id="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your content"
                  value={service.description}
                  onChange={handleChangeInput}
                  name="description"
              />

              <div className="mb-5">
                  <label
                      htmlFor="categoryId"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                      Price
                  </label>
                  <input
                      type="number"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={service.price}
                      onChange={handleChangeInput}
                      name="price"
                  />
              </div>
              <div className="mb-5">
                  <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                      Type
                  </label>
                  <input
                      type="text"
                      id="type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={service.type}
                      onChange={handleChangeInput}
                      name="type"
                  />
              </div>
              <button
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  type="submit"
              >
                  Update Post
              </button>
          </form>
      </div>
  );
}
