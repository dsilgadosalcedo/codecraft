import React from 'react'

import NavProjectsUI from './nav-projects.ui'
import { useImportExport } from './use-import-export'

export default function NavProjectsContainer() {
  const props = useImportExport()
  return <NavProjectsUI {...props} />
}
